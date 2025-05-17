import './Button.css';

const Button = ({ onClick, children, type, disabled }) => {
    // classname for a disabled button, this helps to remove the active pseudoclass on disabled buttons
    let className = '';
    if (disabled) className = 'disabled-btn ';
    else className = 'btn ';

    // classname for different kinds of classes (save, confirm, cancel, etc...)
    if (type) className += type;
    else className += 'bg-blue';

    return (
        <button disabled={disabled} onClick={onClick} className={className}>
            {children}
        </button>
    );
};

export default Button;
