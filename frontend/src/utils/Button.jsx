import './Button.css';

const Button = ({ onClick, children, type }) => {
    return (
        <button onClick={onClick} className={`btn ${type ? type : 'bg-blue'}`}>
            {children}
        </button>
    );
};

export default Button;
