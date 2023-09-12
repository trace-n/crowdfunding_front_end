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

const ProjectPage = () => {

    const {auth, setAuth} = useAuth();


    // use hook in react router called `useParams` to get id from URL to pass to useProject hook

    const { id } = useParams();

    // useProject returns 3 params
    const { project, pledges, isLoading: isLoadingProject, error: errorProject, setPledges } = useProject(id);
    // const { project, isLoading: isLoadingProject, error: errorProject, setProject } = useProject(id);
        // const { project, isLoading: isLoadingProject, error: errorProject, setProject } = useProject(id);
    


    if (project) {
        console.log("pledges:", project.pledges);
    }
    // rename the parameters for unique reference 
    const { users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();
    // const initialState = project.pledges;
    // console.log(initialState);
    // const [pledges, setPledges] = useState([]);

    
            // // initial state
    // if (!isLoadingProject) {

    // }
    if (isLoadingProject || isLoadingUsers) {
        return (<p>LOADING...</p>);
    }

    

    if (errorProject) {
        return (<p>{errorProject.message}</p>);
    }

    if (errorUsers) {
        return (<p>{errorUsers.message}</p>);
    }

    // return the screen as display

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

    // total value of pledges
    const valuePledges = project.pledges.reduce((total, pledge) => total + pledge.amount, 0);
    // console.log('total',valuePledges);

    let progress = parseInt(valuePledges) / parseInt(project.goal);
    progress = Math.round(progress * 100);
    if ( progress > 100 ) {
        progress = 100;
    } 

    const numberPledges = (project.pledges).length;

    
    const deleteSinglePledge = (pledgeId) => {
        console.log(" onclick delete testinglepledge event called");
        // event.preventDefault();
        if (pledgeId) {
            deletePledge(
                pledgeId
            ).then((response) => {
                console.log(response);
                console.log("pledgeid", pledgeId)
                console.log("before pledges",pledges);
                const filteredPledges = pledges.filter((pledge) => pledge.id !== pledgeId);
                console.log("fitlered pledges",filteredPledges);
                setPledges(filteredPledges);
                console.log("after pledges",pledges);

            });
            

        }
    };

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
                    {/* {testData.map((item, idx) => (
                        <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                    ))} */}
                </div>
                <h2 className='project-h2'>{numberPledges.toLocaleString()}</h2>
                <h3>Pledges</h3>                
                <h2 className='project-h2'>{`${ !projectEnded ? daysToGo : 'Project Ended'}`}</h2>
                <h3>{`${ today < endDate ? 'Days to Go': ''}`}</h3>          
                { (!projectEnded) ? ( 
                    <>
                { (auth.token) ? (
                    <CreatePledgeForm projectId={id}/>   
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
                    {JSON.stringify(pledges)}
                </div>
                <ul>
                    {pledges.map((pledgeData, key) => {
                        return (
                            <li key={key}>
                                ${pledgeData.amount.toLocaleString()} from {pledgeData.supporter}
                                {users.filter(user => user.id === pledgeData.supporter)[0].username}
                                {/* function to loop through users hook to find the support name for users get api */}
                                {/* {pledgeData.amount} from {users.filter(user => user.id === pledgeData.supporter)[0].name}  */}
                                {auth.token ? (
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