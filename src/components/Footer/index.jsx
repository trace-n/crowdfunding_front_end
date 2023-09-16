import { Link, Outlet } from 'react-router-dom';
import './style.css';
import fundlingLogoCol from '../../assets/fundling-website-favicon-color.png';


const Footer = () => {
    return (
        <div> 
            <footer className='footer'>
                <ul>

                    <li>
                        <Link to='/contact'>CONTACT</Link>
                    </li>      
                    <li>
                        <Link to='/' className='logo-text'>© FUNDLING 2023<img src={fundlingLogoCol} alt='fundling icon' className='image-footer' /></Link>
                    </li>     
                    <li>
                        <p>
                            SITE CREATED WITH REACT AND DRF+
                        </p>
                    </li>   
                </ul>
                <ul>

                </ul> 
            </footer>
            {/* <Outlet /> */}
        </div>
    );
}

export default Footer;0