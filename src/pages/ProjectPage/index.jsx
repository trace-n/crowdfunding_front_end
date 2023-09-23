import './style.css';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { useProject } from '../../hooks/use-projects';
import { useUsers } from '../../hooks/use-users';
import ProgressBar from '../../components/ProgressBar';
import CreatePledgeForm from '../../components/CreatePledgeForm';
import DeletePledgeButton from '../../components/DeletePledgeButton';
import { useState } from 'react';
import { postPledge, deletePledge } from '../../api/pledges';
import EditPledgeButton from '../../components/EditPledgeButton';
import Spinner from '../../components/Spinner';
import MessageCard from '../../components/MessageCard';

const ProjectPage = () => {

    const {auth, setAuth} = useAuth();

    const { id } = useParams();

    const { users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();
    const { project, pledges, isLoading: isLoadingProject, error: errorProject, setPledges } = useProject(id);

    const [messageBlock, setMessageBlock] = useState(false);
    const [messageBlockError, setMessageBlockError] = useState(false);
    const [messageBlockDelete, setMessageBlockDelete] = useState(false);

    const [pledge, setPledge] = useState({
        id: '',
        supporter: auth.id,
        amount: '10', // initial state default value 10
        comment: '',
        anonymous: false,
        project: '',
    });

    if (isLoadingProject || isLoadingUsers) {
        return (<Spinner />)
    }

    if (errorProject) {
        return (
            <MessageCard 
                message={`Error with project - ${errorProject.message}`} 
                messageType='header' 
            />
            );            
    }

    if (errorUsers) {
        return (
            <MessageCard 
                message={`Error with users - ${errorUsers.message}`} 
                messageType='header' 
            />
            );            
    }

    const numberPledges = (pledges).length;
    const valuePledges = pledges.reduce((total, pledge) => total + parseInt(pledge.amount), 0);    
    const today = Date.parse(new Date());
    const endDate = Date.parse(project.date_end);
    const dateStrip = project.date_end.substr(0, 10);
    const endDateFormatted = dateStrip.substr(8,2)+'/'+dateStrip.substr(5,2)+'/'+dateStrip.substr(0,4);

    let projectEnded = false;
    let daysToGo;
    
    if ( today < endDate ) {
        // convert the time difference in milliseconds back to days
        daysToGo = Math.ceil((endDate - today) / (1000 * 3600 * 24));
    } else {
        projectEnded = true;
    }
   
    // total value of pledges compared to the total goal for progress bar display
    let progress = parseInt(valuePledges) / parseInt(project.goal);
    progress = Math.round(progress * 100);
    if ( progress > 100 ) {
        progress = 100;
    } 

    let currentUser = users.find(user => user.id === project.owner); 

    // get last 6 pledges
    const pledgeSortedDesc = [...pledges].sort((a,b) => b.id - a.id);
    const pledgeSortedRecent = pledgeSortedDesc.slice(0, 5);
   

    const handleChange = (event) => {
        const { id, value } = event.target;
        // cannot do a ?? conditional as event.target.value will always have a value, even for checkbox and submit will fail with value on

        if (id == 'anonymous'){
            setPledge((prevPledge) => ({
                ...prevPledge,
                [id]: event.target.checked,
            }));

        } else { setPledge((prevPledge) => ({
            ...prevPledge,
            [id]: value,  
            }));

        }
            
    };

    const handleSubmit = (id, event) => {
        event.preventDefault(); 
        
        if (pledge.amount && pledge.comment) {
            
            if (pledge) {

                pledge.project = id; 

                postPledge(
                    pledge.amount,
                    pledge.comment,
                    pledge.anonymous,
                    pledge.project,
                ).then((response) => {
                    pledge.id = response.id;
                    const newPledges = [pledge, ...pledges];
                    setPledges(newPledges);
                    setMessageBlock(true);
                });
            }
        } 
    };

    const deleteSinglePledge = (pledgeId) => {
        
        if (pledgeId) {
            deletePledge(
                pledgeId
            ).then((response) => {
                const filteredPledges = pledges.filter((pledge) => pledge.id !== pledgeId);
                setPledges(filteredPledges);
                setMessageBlockDelete(true);
            }); 
        }
    }; //end deleteSinglePledge

    return (
        <div>
            <div>
                <h2>{project.title}</h2>
            </div>    
            <div className='project-summary'>
                <section><img src={project.image} alt='project image'></img></section>
                <section className='project-side'>
                <h2 className='pledge-amount'>${valuePledges.toLocaleString()}</h2>
                <h3> Raised of $ {project.goal.toLocaleString()} Goal</h3>
                 <div className='progress-bar'>
                    <ProgressBar bgcolor={'#6a1b9a'} completed={progress} />
                </div>
                <div className='project-stat-card'>
                <div className='project-stat-item'>
                <h2 className='project-h2'>{numberPledges.toLocaleString()}</h2>
                <h3>Pledges</h3>           
                </div>   

                { !projectEnded ? (
                    <div className='project-stat-item'>
                        <h2 className='project-h2'>{daysToGo}</h2>
                        <h3>Days to Go</h3>
                    </div> 
                ):(
                    <h3>
                        Project Ended
                    </h3>
                ) }
                </div>

                { (auth.token) ? ( 
                    <>
                    { (!projectEnded && parseInt(auth.id) !== project.owner) ? (
                        <>
                        <CreatePledgeForm 
                            projectId={id} 
                            onClick={handleSubmit}
                            onChange={handleChange}
                        /> 
                         
                        { messageBlock && 
                            <li className='message'>
                                <MessageCard message='Thanks for your donation!' />
                            </li>
                        }
                        </>
                        
                    ) : ( 
                        null
                    )}   
                    </>
                ) :  ( 
                <Link to='/login' 
                className='donate-button'>DONATE</Link>
                 ) }
                </section>
            </div>    
            <div className='project-detail'>
            <section className='project-section'>
                <h3 className='project-title'>{project.title}</h3>
                <h4>Project Created By: {`${currentUser.first_name} ${currentUser.last_name}`}
                </h4>
                <h4>
                    End Date: {endDateFormatted}
                </h4>
                <p>{project.description}</p>
                { (pledges.length > 0) &&
                    <>
                <h4 className='recent-pledges'>
                    RECENT PLEDGES
                </h4>
                { messageBlockDelete && 
                    <div className='delete-pledge'>
                        <MessageCard 
                            message='Pledge deleted successfully'
                        />
                    </div> 
                }              

                <ul className='pledge-group'>
                    <li className='pledge-items'>
                        <div className='pledge-grid-right'><h4>Amount</h4></div>
                        <div className='pledge-grid'><h4>Pledger</h4></div>
                        <div className='pledge-edit'>
                        </div>                         
                    </li>

{/* new pledges map based on sorted desc top pledges */}

                    {pledgeSortedRecent.map((pledgeData, key) => {
                        currentUser = users.find(user => user.id === parseInt(pledgeData.supporter));
                        return (
                            <>

                            <li key={key} className='pledge-items'>
                                <div className='pledge-grid-right'>
                                    ${pledgeData.amount.toLocaleString()}
                                </div>
                                <div className='pledge-grid'>
                                    { pledgeData.anonymous ? ( 'Anonymous' ) : ( `${currentUser.first_name} ${currentUser.last_name}`) }
                                </div>
                                <div className='pledge-edit'>
                                    { (auth.token && auth.id == pledgeData.supporter) &&
                                    // ? (
                                        <>
                                            <EditPledgeButton 
                                                pledgeId={pledgeData.id} 
                                            />
                                            <DeletePledgeButton 
                                                pledgeId={pledgeData.id} 
                                                onClick={deleteSinglePledge} 
                                            />
                                        </>

                                    // ) : null 
                                    }
                                </div>
                            </li>
                            </>
                        );  
                    })}
                </ul>
                </> }   
                </section>
            </div>
        </div>
        
    );
}

export default ProjectPage;