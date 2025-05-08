import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '../../utils/Button.jsx';
import Input from '../../utils/Input.jsx';
import Card from '../../components/app/Card.jsx';
import AuthForm from '../../components/auth/AuthForm.jsx';
import Question from '../../components/auth/Question.jsx';
import { uiActions } from '../../store/ui-slice.js';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(uiActions.hideAuthButtons()); // hide the login and get started buttons

    const handleSignup = (event) => {
        event.preventDefault();
        navigate('/home');
    };

    const desc = 'Fill in details below to create a new account';
    return (
        <main>
            <Card>
                <AuthForm
                    onSubmit={handleSignup}
                    heading="Get started"
                    description={desc}
                >
                    <section>
                        <Input
                            type="text"
                            placeholder="name and surname"
                            label="Fullname"
                        />
                    </section>
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
                    <section>
                        <Input
                            type="password"
                            placeholder="Confirm your password"
                            label="Confirm password"
                        />
                    </section>
                    <div className="btn-submit-container">
                        <Button>Create Account</Button>
                    </div>
                </AuthForm>
                <Question link="/login" linkText="Login">
                    Already have an account?
                </Question>
            </Card>
        </main>
    );
};

export default Signup;
