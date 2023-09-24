import './style.css'
import { Link, Outlet } from 'react-router-dom';
import fundlingLogoCol from '../../assets/fundling-website-favicon-color.png';
import { useAuth } from '../../hooks/use-auth';
import { useState } from 'react';

const NavBar = () => {
    
    const {auth, setAuth} = useAuth();
    const userId = auth.id;
    const userLink = `users/${userId}`;
    const [displayButton, setDisplayButton] = useState('');
    const [displayCloseButton, setDisplayCloseButton] = useState('display-none');
    
    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('id');
        setAuth({ 
            token: null, 
            username: null,
            id: null,
        });
        handleClick();
    };

    const handleClick = () => {
        if ( displayButton ) {
            setDisplayButton('');
            setDisplayCloseButton('display-none');
        } else {
            setDisplayButton('display-none');
            setDisplayCloseButton('');
        }

    }

    return (
<header>
            <div className="mobile-header">
                <div className="nav-icons">                    
                    <nav className="nav-bar">
                    <div className='left-nav display-none'>
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
                     <li className='nav-logo-text'>
                         <Link to='/' className='nav-logo-text'>FUNDLING<img src={fundlingLogoCol} alt='fundling small logo' className='image-nav' /></Link>
                     </li>    
                 </div>
                 <div className='right-nav display-none'>     
                     <ul> 
                        {auth.token ? (
                         <>
                         <div class="navbar">
                        <div class="dropdown">
                            <button class="dropbtn">
                            <Link to={userLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="user-svg">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                 </svg> 
                                 {auth.username}
                                 </Link>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                            className="dropdown-chevron">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                            </button>
                            <div class="dropdown-content">
                            <Link to={userLink}> 
                                Account 
                            </Link>  
                            <Link to='/projects'> 
                                My Projects
                            </Link>   
                            <Link to='/pledges'> 
                                My Pledges
                            </Link>  
                            </div>
                        </div>
                        </div>
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
                    </nav>   
          
                    <button 
                        className={`menu-button ${displayButton}`}
                        onClick={handleClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`menu-icon ${displayButton}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                       
                    </button>
                    <button 
                        className={`menu-close-button ${displayCloseButton}`}
                        onClick={handleClick}
                    >                
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`menu-close ${displayCloseButton}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>                  
                    </button>
                </div>
            </div>  
                <nav className={`mobile-nav ${displayCloseButton}`}> 
                    <li className='nav-logo-text-mobile'>
                         <Link to='/'>FUNDLING<img src={fundlingLogoCol} alt='fundling small logo' className='image-nav' /></Link>
                     </li>                   
                    <li>
                        <Link to='/about' onClick={handleClick}className='mobile-about'>About</Link>
                    </li>
                    <li>
                        <Link to='/project' onClick={handleClick}>Start Project</Link>
                    </li>   
                    { auth.token ? (
                        <>
                        <li>
                            <Link 
                                to={userLink} 
                                onClick={handleClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="user-svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                {auth.username}
                            </Link>
                        </li>     
                        <li>                        
                            <Link to='/projects' onClick={handleClick}> 
                                My Projects
                            </Link>                        
                        </li>  
                        <li> 
                            <Link to='/pledges'
                                onClick={handleClick} 
                            >   
                                My Pledges
                            </Link>
                        </li>                              
                        <li>
                            <Link to='/' onClick={handleLogout}>
                                Log out
                            </Link>
                        </li>
                        </>
                    ) : (
                        <li>
                            <Link to='/login' onClick={handleClick}> 
                                Log in
                            </Link>
                        </li>
                    )}
                    
                </nav>  
        </header>  
    );
}

export default NavBar;