import spinner from '../../assets/spinner.gif';
import './style.css';

const Spinner = () => {
    return (
        <div> 
            <img src={spinner} alt='spinner' className='spinner-img'/>
        </div>
    );
}

export default Spinner;