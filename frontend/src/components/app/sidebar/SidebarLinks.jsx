import { useSelector } from 'react-redux';
import './SidebarLinks.css';

const SidebarLinks = ({ onNavigate }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    return (
        <ul className="sidebar__links">
            {isAuth && (
                <li onClick={() => onNavigate('/leagues/create')}>
                    Create new leauge
                </li>
            )}
            <li onClick={() => onNavigate('/about')}>About</li>
            <li onClick={() => onNavigate('/contact')}>Contact</li>
        </ul>
    );
};

export default SidebarLinks;
