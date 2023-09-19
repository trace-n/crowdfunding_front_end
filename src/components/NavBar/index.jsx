import './style.css'
import { Link, Outlet } from 'react-router-dom';
// import fundlingLogoSmall from '../../assets/logo-small.png';
import fundlingLogoCol from '../../assets/fundling-website-favicon-color.png';
import { useAuth } from '../../hooks/use-auth';
import { useState } from 'react';
// import useUsers from '../../hooks/use-users';

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
        console.log('got here disp butt / close btn', displayButton, displayCloseButton);
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
                             //  needs a react fragment eg. <React Fragment> but this can be short hand as <> to infer a fragment as there is more than one element 
                         <>
                             <li>                        
                                 <Link to='/projects'> 
                                     MY PROJECTS
                                 </Link>                        
                             </li>     
                             <li>
                                 <Link to={userLink}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="user-svg">
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
                <ul>
                    {/* <li className='nav-logo-text'> */}
                    {/* <li>
                         <Link to='/' className='nav-logo-text'>FUNDLING<img src={fundlingLogoCol} alt='fundling small logo' className='image-nav' /></Link>
                     </li>                       */}
                    <li>
                        <Link to='/about' onClick={handleClick}className='mobile-about'>ABOUT</Link>
                    </li>
                    <li>
                        <Link to='/project' onClick={handleClick}>START PROJECT</Link>
                    </li>   
                    { auth.token ? (
                        <>
                        <li>                        
                                <Link to='/projects' onClick={handleClick}> 
                                    MY PROJECTS
                                </Link>                        
                            </li>                                
                        <li>
                            <Link to={userLink} onClick={handleClick}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="user-svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {auth.username}
                            </Link>
                        </li>     
                        <li>
                            <Link to='/' onClick={handleLogout}>
                                LOG OUT
                            </Link>
                        </li>
                        </>
                    ) : (
                        <li>
                            <Link to='/login' onClick={handleClick}> 
                                LOG IN
                            </Link>
                        </li>
                    )}
                    </ul>   
                </nav>  
        </header>  


    );
}

export default NavBar;


{/* // ==================================
        //     <div> 
        //      <div className='mobile-header'>
        //      <nav className='nav-bar display-none'>
        //         <div className='left-nav'>
        //             <ul>
        //                 <li>
        //                     <Link to='/about'>ABOUT</Link>
        //                 </li>
        //                 <li>
        //                     <Link to='/project'>START PROJECT</Link>
        //                 </li>   
        //             </ul>   
        //         </div>
        //         <div className='centre-nav'>
        //             <li className='nav-logo-text'>
        //                 <Link to='/' className='nav-logo-text'>FUNDLING<img src={fundlingLogoCol} alt='fundling small logo' className='image-nav' /></Link>
        //             </li>    
        //         </div>
        //         <div className='right-nav'>     
        //             <ul> */}
                     {/* <li>
        //                 <Link to='#'>SEARCH</Link>
        //             </li> 
        //                {auth.token ? (
        //                     //  needs a react fragment eg. <React Fragment> but this can be short hand as <> to infer a fragment as there is more than one element 
        //                 <>
        //                     <li>                        
        //                         <Link to='/projects'> 
        //                             MY PROJECTS
        //                         </Link>                        
        //                     </li>     
        //                     <li>
        //                         <Link to={userLink}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="user-svg">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        //                         </svg>
        //                         {auth.username}

        //                         {/* {auth.id} */}

        //                         </Link>
        //                     </li>                     
        //                     <li>
        //                         <Link to='/' className='login-button' onClick={handleLogout}>
        //                             LOG OUT
        //                         </Link>
        //                     </li>
        //                 </>
        //                 ) : (
        //                     <li>
        //                         <Link to='/login' 
        //                         className='login-button'>LOG IN</Link>
        //                     </li>
        //                 )}
        //                 </ul>            
        //                 </div> 
        //         {/* </ul> */}
        //     </nav>
        //     <button class={`menu-button ${displayButton}`} onClick={handleClick}>
        //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="menu-icon">
        //             <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        //         </svg>
        //     </button>
        //     <button class={`menu-close ${displayCloseButton}`}  onClick={handleClick}>                
        //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="menu-close">
        //             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        //             </svg>                          
        //     </button>
        // </div>

        // <nav class={`mobile-nav ${displayCloseButton}`} > 
        //     <ul>
        //         <li>
        //             <Link to='/about'>ABOUT</Link>
        //         </li>
        //         <li>
        //             <Link to='/project'>START PROJECT</Link>
        //         </li>  
        //         <li>
        //             <Link to='/login' 
        //             className='login-button'>LOG IN</Link>
        //         </li>                 
        //     </ul>
        // </nav>  
        // </div>
        