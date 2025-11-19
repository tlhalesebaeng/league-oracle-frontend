import ReactDOM from 'react-dom';
import closeImg from '../../../assets/close.png';
import correctImg from '../../../assets/correct.png';
import errorImg from '../../../assets/error.png';
import './Alert.css';

const Alert = ({ type, message, onClose }) => {
    let classes = '';
    let imageSrc = '';
    let heading = '';

    if (type === 'success') {
        classes = ' alert__success';
        imageSrc = correctImg;
        heading = 'Success';
    }

    if (type === 'error') {
        classes = ' alert__error';
        imageSrc = errorImg;
        heading = 'Error';
    }

    return ReactDOM.createPortal(
        <div className={`alert${classes}`}>
            <img className="alert__correct-img" src={imageSrc} />
            <p>
                <span>{heading}</span>: {message}
            </p>
            <img
                onClick={onClose}
                className="alert__close-img"
                src={closeImg}
            />
        </div>,
        document.getElementById('alert-hook')
    );
};

export default Alert;
