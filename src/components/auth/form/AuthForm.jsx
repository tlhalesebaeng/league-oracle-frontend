import './AuthForm.css';

const AuthForm = ({ heading, description, children }) => {
    return (
        <form className="auth-form">
            <h1>{heading}</h1>
            <p className="description">{description}</p>
            {children}
        </form>
    );
};

export default AuthForm;
