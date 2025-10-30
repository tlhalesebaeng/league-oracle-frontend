import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { sidebarActions } from '../../../store/ui/sidebar-slice.js';
import { useLogout } from '../../../hooks/useLogout.js';

import Button from '../../../utils/Button.jsx';
import SidebarLinks from './SidebarLinks.jsx';
import closeImg from '../../../assets/close.png';
import './Sidebar.css';
import Logout from '../Logout.jsx';

const Sidebar = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleLogout, isLoading } = useLogout();

    const resetBodyOverflow = () => {
        // This is not declarative and its not recommeded to do this, but i cant find a better easy way :(
        document.getElementsByTagName('body')[0].style.overflow = 'visible';
    };

    const handleCloseSidebar = () => {
        // Dispatch the hide sidebar action
        dispatch(sidebarActions.hideSidebar());

        // Enable scrolling
        resetBodyOverflow();
    };

    const handleNavigation = (url) => {
        // Close the side bar
        handleCloseSidebar();

        // Navigate to the provided url
        navigate(url);
    };

    const handleSidebarLogout = async () => {
        // Log out the user
        await handleLogout();

        // Navigate to the landing page
        handleNavigation('/');
    };

    return ReactDOM.createPortal(
        <ul className="sidebar">
            <li className="sidebar__close-img">
                <img onClick={handleCloseSidebar} src={closeImg} />
            </li>
            <li className="sidebar__content">
                <SidebarLinks onNavigate={handleNavigation} />
            </li>
            <li className="sidebar__auth-buttons">
                {isAuth && (
                    <Logout
                        onLogout={handleSidebarLogout}
                        loading={isLoading}
                    />
                )}
                {!isAuth && (
                    <>
                        <Button
                            onClick={() => handleNavigation('/login')}
                            type="no-bg"
                        >
                            Login
                        </Button>
                        <Button onClick={() => handleNavigation('/signup')}>
                            Get started
                        </Button>
                    </>
                )}
            </li>
        </ul>,
        document.getElementById('sidebar-hook')
    );
};

export default Sidebar;
