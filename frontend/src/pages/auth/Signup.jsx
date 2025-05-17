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
import AuthForm from '../../components/auth/AuthForm.jsx';
import Question from '../../components/auth/Question.jsx';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const { error, setError, request, isLoading } = useFetch();

    dispatch(uiActions.hideAuthButtons()); // hide the login and get started buttons

    const handleInputChange = (type, value) => {
        setError(''); // reset the error if any
        setData((prevData) => ({ ...prevData, [type]: value.trim() }));
    };

    const handleSignup = async (event) => {
        event.preventDefault(); // prevent browser reload

        const response = await request('/auth/signup', 'post', data);

        if (response && response.data) {
            dispatch(authActions.authenticate(response.data.user));
            navigate('/home');
        }
    };

    // input data validation (no need for state because every input change reloads the component)
    let disabled = false;
    if (
        !data.email ||
        !isValidEmail(data.email) ||
        !data.firstName ||
        !data.lastName ||
        !data.password ||
        !data.passwordConfirm ||
        data.password !== data.passwordConfirm
    ) {
        disabled = true;
    }

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
                            onInputChange={(event) =>
                                handleInputChange(
                                    'firstName',
                                    event.target.value
                                )
                            }
                            value={data.firstName || ''}
                            type="text"
                            placeholder="Your first name"
                            label="Firstname"
                        />
                    </section>
                    <section>
                        <Input
                            onInputChange={(event) =>
                                handleInputChange(
                                    'lastName',
                                    event.target.value
                                )
                            }
                            value={data.lastName || ''}
                            type="text"
                            placeholder="Your last name"
                            label="Lastname"
                        />
                    </section>
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
                    <section>
                        <Input
                            onInputChange={(event) =>
                                handleInputChange(
                                    'passwordConfirm',
                                    event.target.value
                                )
                            }
                            value={data.passwordConfirm || ''}
                            type="password"
                            placeholder="Confirm your password"
                            label="Confirm password"
                        />
                    </section>
                    {error && <p className="error-message">{error}</p>}
                    <div className="btn-submit-container">
                        <Button
                            disabled={isLoading ? true : disabled}
                            onClick={handleSignup}
                        >
                            {isLoading ? 'Loading...' : 'Create account'}
                        </Button>
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
