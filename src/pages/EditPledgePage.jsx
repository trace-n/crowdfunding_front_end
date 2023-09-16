
import EditPledgeForm from '../components/EditPledgeForm';
import { useParams } from 'react-router-dom';

const EditPledgePage = () => {
  
    return (

        <div>
            <h3 className='login-text'>
                Edit Pledge
            </h3>    
            <EditPledgeForm/>
        </div>
    ) 
}

export default EditPledgePage;