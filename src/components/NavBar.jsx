import { Link, Outlet } from 'react-router-dom';
import fundlingLogoSmall from '../assets/logo-small.png';
import './NavBar.css'
import { useAuth } from '../hooks/use-auth';
// import Footer from './Footer';

const NavBar = () => {

    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        setAuth({ token: null });
    };


    return (
        <div> 
            <nav className='nav-bar'>
                <ul>
                    <li>
                        <Link to='/about'>ABOUT</Link>
                    </li>
                    <li>
                        <Link to='#'>START PROJECT</Link>
                    </li>      
                    <li className='logo-text'>
                        <Link to='/'><img src={fundlingLogoSmall} alt="fundling small logo"></img></Link>
                    </li>                       
                    {/* <li>
                        <Link to='/'>HOME</Link>
                    </li>                                  */}
                    {/* <Link to='/project'>Project</Link> */}
                    <li>
                        <Link to='#'>SEARCH</Link>
                    </li>
                    <li>
                        {auth.token ? (
                            <Link to='/' className='login-button' onClick={handleLogout}>
                                LOG OUT
                            </Link>
                        ) : (
                            <Link to='/login' className='login-button'>LOG IN</Link>
                        )}
                    </li>                    
                </ul>
            </nav>
            {/* <Outlet /> */}
        </div>
    );
}

export default NavBar;