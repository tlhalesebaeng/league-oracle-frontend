import './AuthForm.css';

const AuthForm = ({ onSubmit, heading, description, children }) => {
    return (
        <form onSubmit={onSubmit} className="auth-form">
            <h1>{heading}</h1>
            <p className="description">{description}</p>
            {children}
        </form>
    );
};

export default AuthForm;
