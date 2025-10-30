import ReactDOM from 'react-dom';
import './Backdrop.css';

const Backdrop = ({ onClose }) => {
    return ReactDOM.createPortal(
        <div onClick={onClose} className="backdrop"></div>,
        document.getElementById('backdrop-hook')
    );
};

export default Backdrop;
