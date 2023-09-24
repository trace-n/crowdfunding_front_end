import CreateProjectForm from '../../components/CreateProjectForm';
import { useAuth } from '../../hooks/use-auth';
import LoginForm from '../../components/LoginForm';

const CreateProjectPage = () => {

    const {auth, setAuth} = useAuth();

    return (
        <div>
            <h2 className='login-text'>Start Project</h2>          
            { auth.token ? ( 
                <CreateProjectForm />
            ) : (
                <LoginForm />
            ) }

        </div>
    ) 
}

export default CreateProjectPage;