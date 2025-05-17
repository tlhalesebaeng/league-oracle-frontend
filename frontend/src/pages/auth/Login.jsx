import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui-slice.js';
import { authActions } from '../../store/auth-slice.js';
import { useFetch } from '../../hooks/useFetch.js';
import isValidEmail from '../../utils/functions/validEmail.js';

import Button from '../../utils/Button.jsx';
import Input from '../../utils/Input.jsx';
import Card from '../../components/app/Card.jsx';
import Question from '../../components/auth/Question.jsx';
import AuthForm from '../../components/auth/AuthForm.jsx';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const { error, setError, request, isLoading } = useFetch();

    dispatch(uiActions.hideAuthButtons()); // hide the login and get started buttons

    const handleInputChange = (type, value) => {
        setError(''); // reset the error if any
        setData((prevData) => ({ ...prevData, [type]: value.trim() }));
    };

    const handleLogin = async (event) => {
        event.preventDefault(); // prevent browser reload

        const response = await request('/auth/login', 'post', data);

        if (response && response.data) {
            dispatch(authActions.authenticate(response.data.user));
            navigate('/home');
        }
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
                <AuthForm heading="Welcome back" description={description}>
                    <section>
                        <Input
                            onInputChange={(event) =>
                                handleInputChange('email', event.target.value)
                            }
                            value={data.email || ''}
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
                            value={data.password || ''}
                            type="password"
                            placeholder="Enter your password"
                            label="Password"
                        />
                    </section>
                    {error && <p className="error-message">{error}</p>}
                    <div className="btn-submit-container">
                        <Button
                            onClick={handleLogin}
                            disabled={isLoading ? true : disabled}
                        >
                            {isLoading ? 'Loading...' : 'Login'}
                        </Button>
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
