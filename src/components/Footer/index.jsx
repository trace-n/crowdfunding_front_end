import { Link, Outlet } from 'react-router-dom';
import './style.css';
import fundlingLogoCol from '../../assets/fundling-website-favicon-color.png';


const Footer = () => {
    return (
        <div> 
            <nav className='footer'>
                <ul>

                    <li>
                        <Link to='/contact'>CONTACT</Link>
                    </li>      
                    <li>
                        <Link to='/' className='logo-text'>© FUNDLING 2023<img src={fundlingLogoCol} alt='fundling icon' className='image-footer' /></Link>
                    </li>                    
                </ul>
            </nav>
            {/* <Outlet /> */}
        </div>
    );
}

export default Footer;