import { Link, Outlet } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';

const LandingPage = () => {
    return (
        <div> 
            <NavBar />
                <Outlet />
            <Footer />
        </div>
    );
}

export default LandingPage;