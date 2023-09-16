import CreateProjectForm from '../components/CreateProjectForm';
import { useAuth } from '../hooks/use-auth';
import LoginForm from '../components/LoginForm';

const CreateProjectPage = () => {

    const {auth, setAuth} = useAuth();

    return (
        <div>
            <h3 className='login-text'>START PROJECT</h3>          
            { auth.token ? ( 
                <CreateProjectForm />
            ) : (
                <LoginForm />
            ) }

        </div>
    ) 
}

export default CreateProjectPage;