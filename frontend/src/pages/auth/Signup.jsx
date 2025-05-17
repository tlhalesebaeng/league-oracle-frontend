import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui-slice.js';
import { authActions } from '../../store/auth-slice.js';
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

    dispatch(uiActions.hideAuthButtons()); // hide the login and get started buttons

    const handleInputChange = (type, value) => {
        setData((prevData) => ({ ...prevData, [type]: value.trim() }));
    };

    const handleSignup = (event) => {
        event.preventDefault(); // prevent browser reload

        // dispatch(authActions.authenticate());
        // navigate('/home');
    };

    // input data validation (no need for state because every input change reloads the component)
    let disabled = false;
    if (
        !data.email ||
        !isValidEmail(data.email) ||
        !data.fullname ||
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
                                    'fullname',
                                    event.target.value
                                )
                            }
                            value={data.fullname || ''}
                            type="text"
                            placeholder="name and surname"
                            label="Fullname"
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
                    <div className="btn-submit-container">
                        <Button disabled={disabled} onClick={handleSignup}>
                            Create Account
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
