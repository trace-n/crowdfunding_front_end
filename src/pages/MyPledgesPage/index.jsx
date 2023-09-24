import './style.css'
import { Link } from 'react-router-dom';
// import MyPledges from "../components/MyProjects";
import PledgeCard from '../../components/PledgeCard';
import { useAuth } from "../../hooks/use-auth";
import LoginForm from "../../components/LoginForm";
import { usePledges } from "../../hooks/use-pledge";
import Spinner from '../../components/Spinner';
import MessageCard from '../../components/MessageCard';
// import { useState } from 'react';
import { deletePledge } from '../../api/pledges';
import { useProjects } from '../../hooks/use-projects';

const MyPledgesPage = () => {

    const {auth, setAuth} = useAuth();
    const { pledges, isLoading: isLoadingPledges, error: errorPledges, setPledges } = usePledges();
    const { projects, isLoading: isLoadingProjects, error: errorProjects, setProjects } = useProjects();

    const userId = auth.id;
    // const [ MyPledges, setMyPledges ] = useState('');

    if (isLoadingPledges || isLoadingProjects) {
        // return (<p>Loading ...</p>);
        return (<Spinner />)
    }

    if (errorPledges) {
        return (<p>{errorPledges.message}</p>);
    }    

    if (errorProjects) {
        return (<p>{errorProjects.message}</p>);
    } 

    const filteredPledges = pledges.filter((pledge) => pledge.supporter == userId );

    const deleteSinglePledge = (id) => {
        if (id) {
            deletePledge(
                id
            ).then((response) => {
                const myPledges = filteredPledges.filter((pledgeData) => pledgeData.id !== id);
                setPledges(myPledges);
            }); 
        }
    }; 


        return (
            <div className='home-box'>
                <h2>My Pledges</h2>
            { auth.token ? (
                <>  { filteredPledges.length > 0 ? (      
                    <div id='project-list'>            
                        {filteredPledges.map((pledgeData, key) => {
                            
                            let relatedProject = projects.find((project) => project.id === pledgeData.project );

                            return <PledgeCard 
                                        key={key} 
                                        pledgeData={pledgeData} 
                                        projectData={relatedProject}
                                        onClick={deleteSinglePledge} 
                                    />
                        })}
                    </div>    
                    ) : (
                        <div className='project-start'> 
                        <MessageCard 
                            message='You have no Pledges' messageType='header' 
                            />
                         <Link to='/'>Donate today</Link>  
                         </div>
                    ) }                    
                </>
            ) : (
                <LoginForm />
            ) }
            </div>
        ) 
}

export default MyPledgesPage;