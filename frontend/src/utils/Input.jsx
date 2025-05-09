import './input.css';

const Input = ({ placeholder, label, type, className }) => {
    return (
        <>
            {label && <label>{label}</label>}
            <input
                className={className || 'input'}
                type={type}
                placeholder={placeholder}
            />
        </>
    );
};

export default Input;
