import { useEffect, useState } from 'react';
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
import closedEye from '../../assets/closed-eye.png';
import openEye from '../../assets/open-eye.png';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const { error, setError, request, isLoading } = useFetch();
    const [passwordToggle, setPasswordToggle] = useState({
        type: 'password',
        isShown: false,
    }); // password toggle state

    useEffect(() => {
        dispatch(uiActions.hideAuthButtons()); // hide the login and get started buttons
    }, []);

    const handleInputChange = (type, value) => {
        setError(''); // reset the error if any
        setData((prevData) => ({ ...prevData, [type]: value.trim() }));
    };

    const handlePasswordToggle = () => {
        setPasswordToggle((prevState) => {
            const newState = {};
            if (prevState.type === 'password') newState['type'] = 'text';
            else newState['type'] = 'password';
            newState['isShown'] = !prevState.isShown;
            return newState;
        });
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

    const inputFields = [
        {
            type: 'email',
            label: 'Email',
            placeholder: 'email@example.com',
            value: data.email,
            inputChangeHandler: (event) =>
                handleInputChange('email', event.target.value),
        },
        {
            type: passwordToggle.type,
            label: 'Password',
            placeholder: 'Enter your password',
            value: data.password,
            imgSrc: passwordToggle.isShown ? closedEye : openEye,
            imageClickHandler: handlePasswordToggle,
            inputChangeHandler: (event) =>
                handleInputChange('password', event.target.value),
        },
    ];

    return (
        <main>
            <Card>
                <AuthForm heading="Welcome back" description={description}>
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
