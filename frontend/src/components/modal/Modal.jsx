import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ children }) => {
    return ReactDOM.createPortal(
        <dialog open>{children}</dialog>,
        document.getElementById('modal-hook')
    );
};

export default Modal;
