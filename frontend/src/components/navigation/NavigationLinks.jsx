import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout.js';

import Logout from '../app/Logout.jsx';
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
                <svg
                    aria-hidden="true"
                    height="25"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="25"
                    data-view-component="true"
                >
                    <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path>
                </svg>
            </div>
            <Logout onLogout={handleLogout} loading={isLoading} />
        </li>
    );
};

export default NavigationLinks;
