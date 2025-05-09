import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../utils/Button';
import './NavigationList.css';
import SearchLeagues from './SearchLeagues';

const NavigationList = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const showAuthButtons = useSelector((state) => state.ui.authButtonsShown);

    const navigate = useNavigate();

    return (
        <ul className="nav-list">
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
        </ul>
    );
};

export default NavigationList;
