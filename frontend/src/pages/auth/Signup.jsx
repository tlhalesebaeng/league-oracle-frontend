import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../store/ui/ui-slice.js';
import { authActions } from '../../store/auth-slice.js';
import { useFetch } from '../../hooks/useFetch.js';
import isValidEmail from '../../utils/functions/validEmail.js';

import Button from '../../utils/Button.jsx';
import Input from '../../utils/Input.jsx';
import Card from '../../components/app/Card.jsx';
import AuthForm from '../../components/auth/AuthForm.jsx';
import Question from '../../components/auth/Question.jsx';
import closedEye from '../../assets/closed-eye.png';
import openEye from '../../assets/open-eye.png';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const { error, setError, request, isLoading } = useFetch();
    const [passwordToggle, setPasswordToggle] = useState({
        passwordType: 'password',
        confirmType: 'password',
        passwordIsShown: false,
        confirmIsShown: false,
    }); // password and confirm password toggle state

    useEffect(() => {
        dispatch(uiActions.hideAuthButtons()); // hide the login and get started buttons
    }, []);

    const handleInputChange = (type, value) => {
        setError(''); // reset the error if any
        setData((prevData) => ({ ...prevData, [type]: value.trim() }));
    };

    const handlePasswordToggle = (type) => {
        if (type === 'password') {
            setPasswordToggle((prevState) => {
                const newState = { ...prevState };
                if (prevState.passwordType === 'password')
                    newState['passwordType'] = 'text';
                else newState['passwordType'] = 'password';
                newState['passwordIsShown'] = !prevState.passwordIsShown;
                return newState;
            });
        }

        if (type === 'confirm-password') {
            setPasswordToggle((prevState) => {
                const newState = { ...prevState };
                if (prevState.confirmType === 'password')
                    newState['confirmType'] = 'text';
                else newState['confirmType'] = 'password';
                newState['confirmIsShown'] = !prevState.confirmIsShown;
                return newState;
            });
        }
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

    const inputFields = [
        {
            type: 'text',
            label: 'Firstname',
            placeholder: 'Your first name',
            value: data.firstName,
            inputChangeHandler: (event) =>
                handleInputChange('firstName', event.target.value),
        },
        {
            type: 'text',
            label: 'Lastname',
            placeholder: 'Your last name',
            value: data.lastName,
            inputChangeHandler: (event) =>
                handleInputChange('lastName', event.target.value),
        },
        {
            type: 'email',
            label: 'Email',
            placeholder: 'email@example.com',
            value: data.email,
            inputChangeHandler: (event) =>
                handleInputChange('email', event.target.value),
        },
        {
            type: passwordToggle.passwordType,
            label: 'Password',
            placeholder: 'Enter your password',
            value: data.password,
            imgSrc: passwordToggle.passwordIsShown ? closedEye : openEye,
            imageClickHandler: () => handlePasswordToggle('password'),
            inputChangeHandler: (event) =>
                handleInputChange('password', event.target.value),
        },
        {
            type: passwordToggle.confirmType,
            label: 'Confirm password',
            placeholder: 'Confirm your password',
            value: data.passwordConfirm,
            imgSrc: passwordToggle.confirmIsShown ? closedEye : openEye,
            imageClickHandler: () => handlePasswordToggle('confirm-password'),
            inputChangeHandler: (event) =>
                handleInputChange('passwordConfirm', event.target.value),
        },
    ];

    return (
        <main>
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
