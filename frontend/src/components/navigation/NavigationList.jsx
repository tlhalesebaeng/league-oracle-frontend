import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../utils/Button.jsx';
import SearchLeagues from './SearchLeagues.jsx';
import NavigationLinks from './NavigationLinks.jsx';
import './NavigationList.css';

const NavigationList = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const showAuthButtons = useSelector((state) => state.ui.authButtonsShown);

    const navigate = useNavigate();

    return (
        <ul className="nav-list">
            {isAuth && (
                <li className="nav-list__links">
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </li>
            )}
            <li>
                <SearchLeagues />
            </li>
            {!isAuth && showAuthButtons && (
                <>
                    <li className="nav-btn">
                        <Button onClick={() => navigate('/login')} type="no-bg">
                            Login
                        </Button>
                    </li>
                    <li>
                        <Button onClick={() => navigate('/signup')}>
                            Get started
                        </Button>
                    </li>
                </>
            )}

            {isAuth && <NavigationLinks />}
        </ul>
    );
};

export default NavigationList;
