import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { uiActions } from '../../store/ui/ui-slice.js';
import isValidEmail from '../../utils/functions/validEmail.js';
import { useFetch } from '../../hooks/useFetch.js';
import { showAlert } from '../../store/ui/alert-slice.js';

import ContactForm from '../../components/contact/ContactForm.jsx';
import Input from '../../utils/Input.jsx';
import Button from '../../utils/Button.jsx';

const Contact = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const { error, isLoading, setError } = useFetch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(uiActions.showAuthButtons());
    }, []);

    const handleContact = (event) => {
        event.preventDefault();
        // send the message to the contact route

        dispatch(showAlert('success', 'Message sent'));
        navigate('/');
        setError('An error occurred');
    };

    const handleInputChange = (type, value) => {
        setError(''); // reset request errors if any
        setData((prevData) => {
            if (type === 'message' || type === 'subject') {
                return { ...prevData, [type]: value };
            }

            return { ...prevData, [type]: value.trim() };
        });
    };

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
            type: 'text',
            label: 'Subject',
            placeholder: 'Your message subject',
            value: data.subject,
            inputChangeHandler: (event) =>
                handleInputChange('subject', event.target.value),
        },
        {
            type: 'text',
            kind: 'text-area',
            label: 'Message',
            placeholder: 'Type your message here',
            value: data.message,
            inputChangeHandler: (event) =>
                handleInputChange('message', event.target.value),
        },
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
