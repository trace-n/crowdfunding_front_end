import CreateProjectForm from '../../components/CreateProjectForm';
import { useAuth } from '../../hooks/use-auth';
import LoginForm from '../../components/LoginForm';
import EditUserForm from '../../components/EditUserForm';
import { useParams } from 'react-router-dom';

const EditUserPage = () => {

    const {auth, setAuth} = useAuth();
    const { id } = useParams();
    
    return (

        <div>
            { auth.token ? (
                <>
                    <h2 className='login-text'>Account</h2>    
                        <EditUserForm userId={id}/>
                </>
                ) : (
                    <LoginForm />
                ) }
        </div>
    ) 
}

export default EditUserPage;