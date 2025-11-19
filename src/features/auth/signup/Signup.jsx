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
import AuthForm from '../../../components/auth/form/AuthForm.jsx';
import Question from '../../../components/auth/question/Question.jsx';
import closedEye from '../../../assets/closed-eye.png';
import openEye from '../../../assets/open-eye.png';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const dataRef = useRef(data);
    const { error, setError, request, isLoading } = useFetch();
    const [passwordToggle, setPasswordToggle] = useState({
        passwordType: 'password',
        confirmType: 'password',
    }); // Password and confirm password eye image toggle state

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
    const handlePasswordToggle = useCallback((type) => {
        setPasswordToggle((prevState) => {
            // Create a new object with previous state fields (to avoid bugs caused by state mutation)
            const newState = { ...prevState };

            if (type === 'password') {
                // The main password input eye image was clicked..

                if (prevState.passwordType === 'password') {
                    // The current input type is password i.e. the password text is hidden

                    newState.passwordType = 'text'; // Show the password
                } else {
                    // The current input type is text i.e. the password text is shown

                    newState.passwordType = 'password'; // Hide the password
                }

                return newState; // Set the state
            } else {
                // The confirm password input eye image was clicked... (Do the same thing to confirm password input field)

                if (prevState.confirmType === 'password') {
                    newState.confirmType = 'text';
                } else {
                    newState.confirmType = 'password';
                }

                return newState;
            }
        });
    }, []);

    const handleSignup = useCallback(async (event) => {
        // Prevent browser reload
        event.preventDefault();

        // Send the request
        const response = await request('/auth/signup', 'post', dataRef.current);

        if (response && response.data) {
            // Add the user details to the auth state
            dispatch(authActions.authenticate(response.data.user));

            // Go to home page
            navigate('/home');
        }
    }, []);

    // Input data validation (no need for state because every input change reloads the component)
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

    // Object with details and functions need for the first name input field
    const firstNameInputObject = useMemo(
        () => ({
            type: 'text',
            label: 'Firstname',
            placeholder: 'Your first name',
            value: data.firstName,
            inputChangeHandler: (event) =>
                handleInputChange('firstName', event.target.value),
        }),
        [data.firstName]
    );

    // Object with details and functions need for the last name input field
    const lastNameInputObject = useMemo(
        () => ({
            type: 'text',
            label: 'Lastname',
            placeholder: 'Your last name',
            value: data.lastName,
            inputChangeHandler: (event) =>
                handleInputChange('lastName', event.target.value),
        }),
        [data.lastName]
    );

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
            type: passwordToggle.passwordType,
            label: 'Password',
            placeholder: 'Enter your password',
            value: data.password,
            imgSrc:
                passwordToggle.passwordType === 'text' ? closedEye : openEye,
            imageClickHandler: () => handlePasswordToggle('password'),
            inputChangeHandler: (event) =>
                handleInputChange('password', event.target.value),
        }),
        [data.password, passwordToggle.passwordType]
    );

    // Object with details and functions need for the confirm password input field
    const confirmPasswordInputObject = useMemo(
        () => ({
            type: passwordToggle.confirmType,
            label: 'Confirm password',
            placeholder: 'Confirm your password',
            value: data.passwordConfirm,
            imgSrc: passwordToggle.confirmType === 'text' ? closedEye : openEye,
            imageClickHandler: () => handlePasswordToggle('confirm-password'),
            inputChangeHandler: (event) =>
                handleInputChange('passwordConfirm', event.target.value),
        }),
        [data.passwordConfirm, passwordToggle.confirmType]
    );

    // All input fields shown on the screen
    const inputFields = [
        firstNameInputObject,
        lastNameInputObject,
        emailInputObject,
        passwordInputObject,
        confirmPasswordInputObject,
    ];

    const desc = 'Fill in details below to create a new account';

    return (
        <main className="center wrapper-spacing">
            <Card>
                <AuthForm
                    onSubmit={handleSignup}
                    heading="Get started"
                    description={desc}
                >
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
                            disabled={isLoading || disabled}
                            onClick={handleSignup}
                            loading={isLoading}
                        >
                            Create account
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
