import CreateProjectForm from '../../components/CreateProjectForm';
import { useAuth } from '../../hooks/use-auth';
import LoginForm from '../../components/LoginForm';
// import EditUserForm from '../components/EditUserForm';
import EditProjectForm from '../../components/EditProjectForm';
import { useParams } from 'react-router-dom';

const EditProjectPage = () => {

    const {auth, setAuth} = useAuth();
    const { id } = useParams();
    
    return (

        <div>
            { auth.token ? (
                <>
                    <h2 className='login-text'>Edit Project</h2>    
                        <EditProjectForm id={id}/>
                </>
                ) : (
                    <LoginForm />
                ) }
        </div>
    ) 
}

export default EditProjectPage;