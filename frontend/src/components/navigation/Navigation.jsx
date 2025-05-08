import { useNavigate } from 'react-router-dom';

import './Navigation.css';
import NavigationList from './NavigationList';

const Navigation = () => {
    const navigate = useNavigate();

    return (
        <nav>
            <h1 onClick={() => navigate('/')}>League Management</h1>
            <NavigationList />
        </nav>
    );
};

export default Navigation;
