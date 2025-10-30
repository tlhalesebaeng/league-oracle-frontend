import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ children, className }) => {
    return ReactDOM.createPortal(
        <dialog className={`modal${className ? ' ' + className : ''}`} open>
            {children}
        </dialog>,
        document.getElementById('modal-hook')
    );
};

export default Modal;
