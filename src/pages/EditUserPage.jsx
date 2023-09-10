import CreateProjectForm from '../components/CreateProjectForm';
import { useAuth } from '../hooks/use-auth';
import LoginForm from '../components/LoginForm';
import EditUserForm from '../components/EditUserForm';

const EditUserPage = () => {

    const {auth, setAuth} = useAuth();
    console.log("auth", auth);
    console.log("auth id",auth.id);

    return (

        <div>
            { auth.token ? (
                <>
                    <h3 className='login-text'>ACCOUNT</h3>    
                        <EditUserForm userId={auth.id}/>
                </>
                ) : (
                    <LoginForm />
                ) }
        </div>
    ) 
}

export default EditUserPage;