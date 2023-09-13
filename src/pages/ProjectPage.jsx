// import { oneProject } from '../data';
import './ProjectPage.css';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import useProject from '../hooks/use-project';
import ProgressBar from '../components/ProgressBar';
import CreatePledgeForm from '../components/CreatePledgeForm';
import DeletePledgeButton from '../components/DeletePledgeButton';
import { useState } from 'react';
import useUsers from '../hooks/use-users';
import deletePledge from '../api/del-pledge';
import postPledge from '../api/post-pledge';

const ProjectPage = () => {

    const {auth, setAuth} = useAuth();


    // use hook in react router called `useParams` to get id from URL to pass to useProject hook

    const { id } = useParams();

    // useProject returns 3 params
    const { project, pledges, isLoading: isLoadingProject, error: errorProject, setPledges } = useProject(id);

    const [pledge, setPledge] = useState({
        amount: '',
        comment: '',
        anonymous: '',
        project: '',
    });

    // rename the parameters for unique reference 
    const { users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();

    if (isLoadingProject || isLoadingUsers) {
        return (<p>LOADING...</p>);
    }

    if (errorProject) {
        return (<p>{errorProject.message}</p>);
    }

    if (errorUsers) {
        return (<p>{errorUsers.message}</p>);
    }

    // information for total value of pledges and progress
    // if the project has ended, otherwise how many days are left til project ends
    const numberPledges = (pledges).length;
    const valuePledges = pledges.reduce((total, pledge) => total + pledge.amount, 0);    
    const today = Date.parse(new Date());
    const endDate = Date.parse(project.date_end);
    
    let projectEnded = false;
    let daysToGo;
    
    if ( today < endDate ) {
        // convert the time difference in milliseconds back to days
        daysToGo = Math.ceil((endDate - today) / (1000 * 3600 * 24));
    } else {
        projectEnded = true;
    }

    // console.log(auth.token, auth.username);
    
    // total value of pledges compared to the total goal for progress bar display
    let progress = parseInt(valuePledges) / parseInt(project.goal);
    progress = Math.round(progress * 100);
    if ( progress > 100 ) {
        progress = 100;
    } 

    const handleChange = (event) => {
        // const { id, value } = event.target;
        // debugger

        if ( event.target.id == 'anonymous') {
            setPledge((prevPledge) => ({
                ...prevPledge,
                [event.target.id]: event.target.checked,
            }));

        } else {
            setPledge((prevPledge) => ({
                ...prevPledge,
                [event.target.id]: event.target.value,
            }));
        }

        
    };

    const handleSubmit = (event) => {
        debugger
        // event.preventDefault(); // why is this preventing the submit for Donate Create pledge?
        if (pledge.amount && pledge.comment) {
            if (pledge) {

                // handled by handleChange function
                // if ( !pledge.anonymous ) {
                //     pledge.anonymous = false;
                // }

                pledge.project = id; //projectId;

                postPledge(
                    pledge.amount,
                    pledge.comment,
                    pledge.anonymous,
                    pledge.project,
                ).then((response) => {
                    console.log("before new pledges",newPledges);
                    const newPledges = [...pledges, pledge];
                    
                    setPledges(newPledges);
                    console.log("after pledges",pledges);                    
                    // navigate(`project/${projectId}`);
                });
            }
        } 
    };

    const deleteSinglePledge = (pledgeId) => {
        // console.log(" onclick delete testinglepledge event called");
        // event.preventDefault();
        if (pledgeId) {
            deletePledge(
                pledgeId
            ).then((response) => {
                // console.log(response);
                // console.log("pledgeid", pledgeId)
                // console.log("before pledges",pledges);
                const filteredPledges = pledges.filter((pledge) => pledge.id !== pledgeId);
                // console.log("fitlered pledges",filteredPledges);
                setPledges(filteredPledges);
                // console.log("after pledges",pledges);
            }); //end deletePledge
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
                <h2 className='project-h2'>{numberPledges.toLocaleString()}</h2>
                <h3>Pledges</h3>                
                <h2 className='project-h2'>{`${ !projectEnded ? daysToGo : 'Project Ended'}`}</h2>
                <h3>{`${ today < endDate ? 'Days to Go': ''}`}</h3>          
                { (!projectEnded) ? ( 
                    <>
                { (auth.token) ? (
                    <CreatePledgeForm 
                        projectId={id} 
                        onClick={handleSubmit}
                        onChange={handleChange}
                    />   
                ) : ( 
                    <Link to='/login' 
                    className='login-button'>DONATE</Link>
                )}   </>
                ) : null }  
                </section>
                </div>    
            <div className='project-detail'>
            <section>
                <h3>Created By: {project.owner} {users.filter(user => user.id === project.owner)[0].username}</h3>
            <p>{project.description}</p>
                <h3>Pledges:</h3>
                <div>
                    {/* {JSON.stringify(pledges)} */}
                </div>
                <ul>
                    {pledges.map((pledgeData, key) => {
                        return (
                            <li key={key}>
                                ${pledgeData.amount.toLocaleString()} from {pledgeData.supporter}
                                {users.filter(user => user.id === pledgeData.supporter)[0].username}
                                {/* function to loop through users hook to find the support name for users get api */}
                                {/* {pledgeData.amount} from {users.filter(user => user.id === pledgeData.supporter)[0].name}  */}
                                { (auth.token && auth.id == pledgeData.supporter) ? (
                                    // <button intent="danger" onClick={() => deletePledge(pledgeData.id)}>Delete
                                    // </button>
                                    <DeletePledgeButton 
                                        pledgeId={pledgeData.id} 
                                        onClick={deleteSinglePledge} />
                                ) : null }
                            </li>
                        );
                    })}
                </ul>
                </section>
            </div>
        </div>
        
    );

    // }
}

export default ProjectPage;