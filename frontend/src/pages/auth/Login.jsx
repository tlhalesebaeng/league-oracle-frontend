import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui-slice.js';
import { authActions } from '../../store/auth-slice.js';
import { isValidEmail } from '../../utils/utilityFunctions.js';

import Button from '../../utils/Button.jsx';
import Input from '../../utils/Input.jsx';
import Card from '../../components/app/Card.jsx';
import Question from '../../components/auth/Question.jsx';
import AuthForm from '../../components/auth/AuthForm.jsx';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    dispatch(uiActions.hideAuthButtons()); // hide the login and get started buttons

    const handleInputChange = (type, value) => {
        setData((prevData) => ({ ...prevData, [type]: value.trim() }));
    };

    const handleLogin = (event) => {
        event.preventDefault(); // prevent browser reload

        // dispatch(authActions.authenticate());
        // navigate('/home');
    };

    // input data validation (no need for state because every input change reloads the component)
    let disabled = false;
    if (!data.email || !data.password || !isValidEmail(data.email)) {
        disabled = true;
    }

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
                            onInputChange={(event) =>
                                handleInputChange('email', event.target.value)
                            }
                            value={data.email}
                            type="email"
                            placeholder="email@example.com"
                            label="Email"
                        />
                    </section>
                    <section>
                        <Input
                            onInputChange={(event) =>
                                handleInputChange(
                                    'password',
                                    event.target.value
                                )
                            }
                            value={data.password}
                            type="password"
                            placeholder="Enter your password"
                            label="Password"
                        />
                    </section>
                    <div className="btn-submit-container">
                        <Button disabled={disabled}>Login</Button>
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
