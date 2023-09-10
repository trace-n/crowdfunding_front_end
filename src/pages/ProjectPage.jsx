// import { oneProject } from '../data';
import { useParams, Link } from 'react-router-dom';
import useProject from '../hooks/use-project';
import './ProjectPage.css';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../hooks/use-auth';
import CreatePledgeForm from '../components/CreatePledgeForm';
// import DelPledgeLink from '../components/DelPledgeLink';
// import delPledge from '../api/del-pledge';
import DeletePledgeButton from '../components/DeletePledgeButton';
import useUsers from '../hooks/use-users';

const ProjectPage = () => {

    const {auth, setAuth} = useAuth();

    // use hook in react router called `useParams` to get id from URL to pass to useProject hook

    const { id } = useParams();

    // useProject returns 3 params
    const { project, isLoading: isLoadingProject, error: errorProject } = useProject(id);
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


    // if ( auth.token ) {
 // need to update this to check if the auth owner of project is the person logged in? Can we get this from useAuth? 
    //     return (

    //         <form>
    //             <h2>Edit your project</h2>
    //             <div>
    //                 <h3 className='login-text'>LOGIN</h3>
    //                 {/* <label htmlFor='username'>Username:</label> */}
    //                 <input 
    //                     type='text' 
    //                     id='username' 
    //                     placeholder='Enter username' 
    //                     // onChange = {handleChange}
    //                 />
    //             </div>
    //             <div>
    //                 {/* <label htmlFor='password'>Password:</label> */}
    //                 <input 
    //                     type='password' 
    //                     id='password' 
    //                     placeholder='Password' 
    //                     // onChange = {handleChange}
    //                 />
    //             </div>
    //             <button type='submit' >
    //             {/* onClick={handleSubmit}>  */}
    //             SAVE</button>
            
    //         </form>

    //     );

    // } else {
           

    // return the screen as display

    const today = Date.parse(new Date());
    const endDate = Date.parse(project.date_end);

    let daysToGo;
    if ( today < endDate ) {
        // convert the time difference in milliseconds back to days
        daysToGo = Math.ceil((endDate - today) / (1000 * 3600 * 24));
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


    // const testData = [
    //     { bgcolor: "#6a1b9a", completed: progress },
    //     // { bgcolor: "#00695c", completed: 30 },
    //     // { bgcolor: "#ef6c00", completed: 53 },
    //   ];

    return (
        <div>
            <div>
                <h2>{project.title}</h2>
            </div>    
            <div className='project-detail'>
                <section><img src={project.image} alt='project image'></img></section>
                <section className='project-side'>
                <div className='progress-bar'>
                    <ProgressBar bgcolor={'#6a1b9a'} completed={progress} />
                    {/* {testData.map((item, idx) => (
                        <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                    ))} */}
                </div>
                <h2>Goal: $ {project.goal.toLocaleString()}</h2>
                <h3>${valuePledges.toLocaleString()}</h3>
                <p>RAISED</p>  
                <h3>Created By: {project.owner} {users.filter(user => user.id === project.owner)[0].username}</h3>
   
                <h3>{numberPledges.toLocaleString()}</h3>
                <p>Pledges</p>                
                <h3>{`${ today < endDate ? daysToGo : 'Project Ended'}`}</h3>
                <p>{`${ today < endDate ? 'Days to Go': ''}`}</p>             
                {auth.token ? (
                    <CreatePledgeForm projectId={id}/>   
                ) : ( 
                    <Link to='/login' 
                    className='login-button'>DONATE</Link>
                )}           
                <p>{project.description}</p>
                <h3>Pledges:</h3>
                <ul>
                    {project.pledges.map((pledgeData, key) => {
                        return (
                            <li key={key}>
                                ${pledgeData.amount.toLocaleString()} from {pledgeData.supporter}
                                {users.filter(user => user.id === pledgeData.supporter)[0].username}
                                {/* function to loop through users hook to find the support name for users get api */}
                                {/* {pledgeData.amount} from {users.filter(user => user.id === pledgeData.supporter)[0].name}  */}
                                {auth.token ? (
                                    // <button intent="danger" onClick={() => deletePledge(pledgeData.id)}>Delete
                                    // </button>
                                    <DeletePledgeButton pledgeId={pledgeData.id} />
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