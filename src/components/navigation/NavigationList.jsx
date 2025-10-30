import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sidebarActions } from '../../store/ui/sidebar-slice.js';

import Button from '../../utils/Button.jsx';
import SearchLeagues from './SearchLeagues.jsx';
import NavigationLinks from './NavigationLinks.jsx';
import menuImg from '../../assets/menu.png';
import './NavigationList.css';

const NavigationList = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const showAuthButtons = useSelector((state) => state.ui.authButtonsShown);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenSidebar = () => {
        // dispatch the show sidebar action
        dispatch(sidebarActions.showSidebar());

        // this is not declarative and its not recommeded to do this, but i cant find a better easy way :(
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'; // prevent scrolling
    };

    return (
        <ul className="nav-list">
            {isAuth && (
                <li className="nav-list__links">
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </li>
            )}
            <li className="nav-list__search">
                <SearchLeagues />
            </li>
            {!isAuth && showAuthButtons && (
                <li className="nav-list__auth-buttons">
                    <Button onClick={() => navigate('/login')} type="no-bg">
                        Login
                    </Button>
                    <Button onClick={() => navigate('/signup')}>
                        Get started
                    </Button>
                </li>
            )}
            <li onClick={handleOpenSidebar} className="nav-list__menu">
                <img src={menuImg} />
            </li>
            {isAuth && <NavigationLinks />}
        </ul>
    );
};

export default NavigationList;
