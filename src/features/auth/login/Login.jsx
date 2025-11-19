import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../../store/ui/ui-slice.js';
import { authActions } from '../../../store/auth-slice.js';
import { useFetch } from '../../../hooks/useFetch.js';
import isValidEmail from '../../../utils/validEmail.js';

import Button from '../../../components/app/button/Button.jsx';
import Input from '../../../components/app/input/Input.jsx';
import Card from '../../../components/app/card/Card.jsx';
import Question from '../../../components/auth/question/Question.jsx';
import AuthForm from '../../../components/auth/form/AuthForm.jsx';
import closedEye from '../../../assets/closed-eye.png';
import openEye from '../../../assets/open-eye.png';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const dataRef = useRef(data);
    const { error, setError, request, isLoading } = useFetch();
    const [passwordToggle, setPasswordToggle] = useState('password'); // Password eye image toggle state

    useEffect(() => {
        // Hide the login and get started buttons
        dispatch(uiActions.hideAuthButtons());
    }, []);

    // After every data change, update the dataref so that it holds the latest data state
    // On every memoized function we can then use the dataref to get the latest data state
    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    // Function that handles any change that occurs on the input fields (typing)
    const handleInputChange = useCallback((type, value) => {
        // Reset errors if any (To give the user an opportunity to try again)
        setError('');

        // Persist the input changes to the data state variable
        setData((prevData) => ({ ...prevData, [type]: value.trim() }));
    }, []);

    // Function that is ran when we click the eye image on password input fields
    const handlePasswordToggle = useCallback(() => {
        setPasswordToggle((prevState) => {
            if (prevState === 'password') {
                // The current input type is password i.e. the password text is hidden

                return 'text'; // Show the password
            } else {
                // The current input type is text i.e. the password text is shown

                return 'password'; // Hide the password
            }
        });
    }, []);

    // Function the handles login button click
    const handleLogin = useCallback(async (event) => {
        // Prevent browser reload
        event.preventDefault();

        // Send the request
        const response = await request('/auth/login', 'post', dataRef.current);

        if (response && response.data) {
            // Add the user details to the auth state
            dispatch(authActions.authenticate(response.data.user));

            // Go to home page
            navigate('/home');
        }
    }, []);

    // Input data validation (no need for state because every input change reloads the component)
    let disabled = false;
    if (!data.email || !data.password || !isValidEmail(data.email)) {
        disabled = true;
    }

    // Object with details and functions need for the email input field
    const emailInputObject = useMemo(
        () => ({
            type: 'email',
            label: 'Email',
            placeholder: 'email@example.com',
            value: data.email,
            inputChangeHandler: (event) =>
                handleInputChange('email', event.target.value),
        }),
        [data.email]
    );

    // Object with details and functions need for the password input field
    const passwordInputObject = useMemo(
        () => ({
            type: passwordToggle,
            label: 'Password',
            placeholder: 'Enter your password',
            value: data.password,
            imgSrc: passwordToggle === 'text' ? closedEye : openEye,
            imageClickHandler: handlePasswordToggle,
            inputChangeHandler: (event) =>
                handleInputChange('password', event.target.value),
        }),
        [data.password, passwordToggle]
    );

    // All input fields shown on the screen
    const inputFields = [emailInputObject, passwordInputObject];

    // Page instructions
    const instruction = 'Enter your details below to access your account';

    return (
        <main>
            <Card>
                <AuthForm heading="Welcome back" description={instruction}>
                    {inputFields.map((field) => (
                        <section key={field.label}>
                            <Input
                                type={field.type}
                                label={field.label}
                                placeholder={field.placeholder}
                                value={field.value || ''}
                                imgSrc={field.imgSrc}
                                onImageClick={field.imageClickHandler}
                                onInputChange={field.inputChangeHandler}
                            />
                        </section>
                    ))}
                    {error && <p className="error-message">{error}</p>}
                    <div className="btn-submit-container">
                        <Button
                            onClick={handleLogin}
                            disabled={isLoading || disabled}
                            loading={isLoading}
                        >
                            Login
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
