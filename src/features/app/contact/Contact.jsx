import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { showAlert } from '../../../store/ui/alert-slice.js';
import { uiActions } from '../../../store/ui/ui-slice.js';
import isValidEmail from '../../../utils/validEmail.js';
import { useFetch } from '../../../hooks/useFetch.js';

import ContactForm from './form/ContactForm.jsx';
import Input from '../../../components/app/input/Input.jsx';
import Button from '../../../components/app/button/Button.jsx';

const Contact = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const { error, isLoading, setError } = useFetch();
    const navigate = useNavigate();

    useEffect(() => {
        // Hide the login and get started buttons
        dispatch(uiActions.showAuthButtons());
    }, []);

    // Function that handles any change that occurs on the input fields (typing)
    const handleInputChange = useCallback((type, value) => {
        // Reset errors if any (To give the user an opportunity to try again)
        setError('');

        // Persist the input changes to the data state variable
        setData((prevData) => ({ ...prevData, [type]: value }));
    }, []);

    // Function the handles contact button click
    const handleContact = useCallback((event) => {
        // Prevent browser reload
        event.preventDefault();

        // Show a success alert
        dispatch(showAlert('success', 'Message sent'));

        // Navigate to the root route (this will redirect to home page if the user is logged in)
        navigate('/');
    }, []);

    // input data validation
    let disableSendMessage = false;
    if (
        !data.email ||
        !isValidEmail(data.email) ||
        !data.subject ||
        !data.message
    ) {
        disableSendMessage = true;
    }

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

    const subjectInputObject = useMemo(
        () => ({
            type: 'text',
            label: 'Subject',
            placeholder: 'Your message subject',
            value: data.subject,
            inputChangeHandler: (event) =>
                handleInputChange('subject', event.target.value),
        }),
        [data.subject]
    );

    const messageInputObject = useMemo(
        () => ({
            type: 'text',
            kind: 'text-area',
            label: 'Message',
            placeholder: 'Type your message here',
            value: data.message,
            inputChangeHandler: (event) =>
                handleInputChange('message', event.target.value),
        }),
        [data.message]
    );

    const inputFields = [
        emailInputObject,
        subjectInputObject,
        messageInputObject,
    ];

    return (
        <main>
            <ContactForm>
                {inputFields.map((field) => (
                    <section key={field.label}>
                        <Input
                            type={field.type}
                            kind={field.kind}
                            label={field.label}
                            placeholder={field.placeholder}
                            value={field.value || ''}
                            onInputChange={field.inputChangeHandler}
                        />
                    </section>
                ))}
                {error && <p className="error-message">{error}</p>}
                <section>
                    <Button
                        disabled={isLoading || disableSendMessage}
                        onClick={handleContact}
                        loading={isLoading}
                    >
                        Send message
                    </Button>
                </section>
            </ContactForm>
        </main>
    );
};

export default Contact;
