import { Link, Outlet } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <div> 
            <nav className='footer'>
                <ul>

                    <li>
                        <Link to='/contact'>CONTACT</Link>
                    </li>      
                    <li>
                        <Link to='/' className='logo-text'>© FUNDLING 2023</Link>
                    </li>                    
                </ul>
            </nav>
            {/* <Outlet /> */}
        </div>
    );
}

export default Footer;