import './input.css';

const Input = ({ placeholder, label, type }) => {
    return (
        <>
            <label>{label}</label>
            <input className="input" type={type} placeholder={placeholder} />
        </>
    );
};

export default Input;
