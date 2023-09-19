import CreateProjectForm from '../components/CreateProjectForm';
import { useAuth } from '../hooks/use-auth';
import LoginForm from '../components/LoginForm';
import EditUserForm from '../components/EditUserForm';
import { useParams } from 'react-router-dom';

const EditUserPage = () => {

    const {auth, setAuth} = useAuth();
    const { id } = useParams();
    // console.log('userid',id);
    // console.log("auth id",auth.id);
    
    return (

        <div>
            { auth.token ? (
                <>
                    <h2 className='login-text'>ACCOUNT</h2>    
                        {/* <EditUserForm userId={auth.id}/> */}
                        <EditUserForm userId={id}/>
                </>
                ) : (
                    <LoginForm />
                ) }
        </div>
    ) 
}

export default EditUserPage;