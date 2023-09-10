import CreatePledgeForm from '../components/CreatePledgeForm';
import { useParams } from 'react-router-dom';

const CreatePledgePage = () => {
    const { projectId } = useParams();
    console.log("projectId",projectId);
    return (
        <div>
            <CreatePledgeForm projectId={projectId}/>
        </div>
    ) 
}

export default CreatePledgePage;