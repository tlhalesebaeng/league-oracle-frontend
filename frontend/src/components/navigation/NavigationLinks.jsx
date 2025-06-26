import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout.js';

import Logout from '../app/Logout.jsx';
import plusImg from '../../assets/plus.png';
import './NavigationLinks.css';

const NavigationLinks = () => {
    const navigate = useNavigate();
    const { handleLogout, isLoading } = useLogout();

    const handleCreateLeague = () => {
        navigate('/leagues/create');
    };

    return (
        <li className="navigation-links">
            <div
                onClick={handleCreateLeague}
                className="navigation-links__create"
            >
                <img src={plusImg} />
            </div>
            <Logout onLogout={handleLogout} loading={isLoading} />
        </li>
    );
};

export default NavigationLinks;
