
import EditPledgeForm from '../components/EditPledgeForm';
import { useParams } from 'react-router-dom';

const EditPledgePage = () => {
  
    return (

        <div>
            <h2 className='login-text'>
                Edit Pledge
            </h2>    
            <EditPledgeForm/>
        </div>
    ) 
}

export default EditPledgePage;