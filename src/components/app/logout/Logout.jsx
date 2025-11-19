import Button from '../button/Button.jsx';
import './Logout.css';

const Logout = ({ onLogout, loading }) => {
    return (
        <div className="logout">
            <Button onClick={onLogout} type="no-bg" loading={loading}>
                Logout
            </Button>
        </div>
    );
};

export default Logout;
