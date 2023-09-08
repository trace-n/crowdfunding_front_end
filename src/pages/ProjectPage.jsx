// import { oneProject } from '../data';
import { useParams } from 'react-router-dom';
import useProject from '../hooks/use-project';
import './ProjectPage.css';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../hooks/use-auth';

const ProjectPage = () => {

    const {auth, setAuth} = useAuth();

    // use hook in react router called `useParams` to get id from URL to pass to useProject hook

    const { id } = useParams();
    // useProject returns 3 params
    const { project, isLoading, error } = useProject(id);

    // console.log(isLoading);

    if (isLoading) {
        return (<p>loading...</p>);
    }

    if (error) {
        return (<p>{error.message}</p>);
    }


    if ( auth.token ) {
 // need to update this to check if the auth owner of project is the person logged in? Can we get this from useAuth? 
        return (

            <form>
                <h2>Edit your project</h2>
                <div>
                    <h3 className='login-text'>LOGIN</h3>
                    {/* <label htmlFor='username'>Username:</label> */}
                    <input 
                        type='text' 
                        id='username' 
                        placeholder='Enter username' 
                        // onChange = {handleChange}
                    />
                </div>
                <div>
                    {/* <label htmlFor='password'>Password:</label> */}
                    <input 
                        type='password' 
                        id='password' 
                        placeholder='Password' 
                        // onChange = {handleChange}
                    />
                </div>
                <button type='submit' >
                {/* onClick={handleSubmit}>  */}
                SAVE</button>
            
            </form>

        );

    } else {
           

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

    console.log(progress);

    // total # pledges
    // const numberPledges = Object.keys(project.pledges).length;
    const numberPledges = (project.pledges).length;
    // console.log('length num pledges', numberPledges);
        
    // created by username

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
                {/* <h2>{oneProject.title}</h2>
                <h3>Created at: {oneProject.date_created}</h3>
                <h3>{`Status: ${oneProject.is_open}`}</h3>
                <h3>Pledges:</h3>
                <ul>
                    {oneProject.pledges.map((pledgeData, key) => { */}
                <section><img src={project.image} alt='project image'></img></section>
                <section className='project-side'>
                <div className='progress-bar'>
                    <ProgressBar bgcolor={'#6a1b9a'} completed={progress} />
                    {/* {testData.map((item, idx) => (
                        <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                    ))} */}
                </div>
                <h2>Goal: $ {project.goal}</h2>
                <h3>{valuePledges}</h3>
                <p>RAISED</p>  
                <h3>Created By: {project.owner}</h3>
   
                <h3>{numberPledges}</h3>
                <p>Pledges</p>                

                {/* <h3>{`Status: ${project.is_open}`}</h3> */}
                <h3>{`${ today < endDate ? daysToGo : 'Project Ended'}`}</h3>
                <p>{`${ today < endDate ? 'Days to Go': ''}`}</p>

                <a href='#'className='login-button'>DONATE</a>                
                <p>{project.description}</p>
                <h3>Pledges:</h3>
                <ul>
                    {project.pledges.map((pledgeData, key) => {
                        return (
                            <li key={key}>
                                {pledgeData.amount} from {pledgeData.supporter}
                            </li>
                        );
                    })}
                </ul>

                {/* <h3>Created at: {project.date_created}</h3>
                <h3>Changed at: {project.date_changed}</h3>
                <h3>End Date: {project.date_end}</h3>                 */}
                </section>
            </div>
        </div>
        
    );

    }
}

export default ProjectPage;