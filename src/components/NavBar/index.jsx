import './style.css'
import { Link, Outlet } from 'react-router-dom';
// import fundlingLogoSmall from '../../assets/logo-small.png';
import fundlingLogoCol from '../../assets/fundling-website-favicon-color.png';
import { useAuth } from '../../hooks/use-auth';
// import useUsers from '../../hooks/use-users';

const NavBar = () => {
    
    const {auth, setAuth} = useAuth();
    
    const userId = window.localStorage.getItem('id');
    // console.log("nav bar user");
    // const userLink = `users/${auth.id}`;
    const userLink = `users/${userId}`;
    // console.log("auth", auth, "USERLINK===",userLink);



    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('id');
        setAuth({ 
            token: null, 
            username: null,
            id: null,
        });
    };


    return (
        <div> 
            <nav className='nav-bar'>
                {/* <ul> */}
                    <div className='left-nav'>
                        <ul>
                            <li>
                                <Link to='/about'>ABOUT</Link>
                            </li>
                            <li>
                                <Link to='/project'>START PROJECT</Link>
                            </li>   
                        </ul>   
                    </div>
                    <div className='centre-nav'>
                    <ul>
                    <li className='nav-logo-text'>
                        <Link to='/' className='nav-logo-text'>FUNDLING<img src={fundlingLogoCol} alt='fundling small logo' className='image-nav' /></Link>
                    </li>    
                    </ul> 
                    </div>
                    <div className='right-nav'>     
                    <ul>
                    {/* <li>
                        <Link to='#'>SEARCH</Link>
                    </li> */}
                        {auth.token ? (
                            //  needs a react fragment eg. <React Fragment> but this can be short hand as <> to infer a fragment as there is more than one element 
                        <>
                            {/* <li>                        
                                <Link to='/project' className='login-button'>
                                    CREATE
                                </Link>                        
                            </li>      */}
                            <li>
                                <Link to={userLink}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {auth.username}
                                </Link>
                            </li>                     
                            <li>
                                <Link to='/' className='login-button' onClick={handleLogout}>
                                    LOG OUT
                                </Link>
                            </li>
                        </>
                        ) : (
                            <li>
                                <Link to='/login' 
                                className='login-button'>LOG IN</Link>
                            </li>
                        )}
                        </ul>            
                        </div> 
                {/* </ul> */}
            </nav>
            {/* <Outlet /> */}
        </div>
    );
}

export default NavBar;