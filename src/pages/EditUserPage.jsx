import CreateProjectForm from '../components/CreateProjectForm';
import { useAuth } from '../hooks/use-auth';
import LoginForm from '../components/LoginForm';
import EditUserForm from '../components/EditUserForm';
import { useParams } from 'react-router-dom';

const EditUserPage = () => {

    const {auth, setAuth} = useAuth();
    const { userId } = useParams();
    console.log('userid',userId);
    console.log("auth id",auth.id);
    
    return (

        <div>
            { auth.token ? (
                <>
                    <h3 className='login-text'>ACCOUNT</h3>    
                        {/* <EditUserForm userId={auth.id}/> */}
                        <EditUserForm userId={userId}/>
                </>
                ) : (
                    <LoginForm />
                ) }
        </div>
    ) 
}

export default EditUserPage;