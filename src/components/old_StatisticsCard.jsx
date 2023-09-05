// import { Link } from 'react-router-dom';
// import './ProjectCard.css';

const StatisticsCard = (props) => {
    const { statisticsData } = props;
    // const projectLink = `project/${projectData.id}`;
    // console.log("pledge amt:",statisticsData.pledge_amount)
    return (
        <div>
            <h3>{statisticsData.project_count}</h3>
           
        </div>
    );
}

export default StatisticsCard;