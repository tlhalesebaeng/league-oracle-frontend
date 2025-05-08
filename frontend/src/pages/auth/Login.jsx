import { useNavigate } from 'react-router-dom';
import Button from '../../utils/Button.jsx';
import Input from '../../utils/Input.jsx';
import Card from '../../components/app/Card.jsx';
import Question from '../../components/auth/Question.jsx';
import AuthForm from '../../components/auth/AuthForm.jsx';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice.js';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(uiActions.hideAuthButtons()); // hide the login and get started buttons

    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/home');
    };

    const description = 'Enter your details below to access your account';
    return (
        <main>
            <Card>
                <AuthForm
                    onSubmit={handleLogin}
                    heading="Welcome back"
                    description={description}
                >
                    <section>
                        <Input
                            type="email"
                            placeholder="email@example.com"
                            label="Email"
                        />
                    </section>
                    <section>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            label="Password"
                        />
                    </section>
                    <div className="btn-submit-container">
                        <Button>Login</Button>
                    </div>
                </AuthForm>
                <Question link="/signup" linkText="Signup">
                    Don't have an account?
                </Question>
            </Card>
        </main>
    );
};

export default Login;
