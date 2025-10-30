import { useNavigate } from 'react-router-dom';

import './Navigation.css';
import NavigationList from './NavigationList';
import { useSelector } from 'react-redux';

const Navigation = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const handleAppNameClick = () => {
        if (isAuth) return navigate('/home');
        navigate('/');
    };

    return (
        <nav>
            <h1 onClick={handleAppNameClick}>League Oracle</h1>
            <NavigationList />
        </nav>
    );
};

export default Navigation;
