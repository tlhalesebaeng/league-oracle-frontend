import Card from '../../../../components/app/card/Card.jsx';
import './ContactForm.css';

const ContactForm = ({ children }) => {
    return (
        <section className="contact-form">
            <aside>
                <h2>Contact Us</h2>
                <p>
                    We are more than happy to respond to your questions,
                    feedback or requests. Reach out to us and our team will get
                    back to you as soon as possible
                </p>
                <h3>Contact Details</h3>
                <ul className="contact-form__details">
                    <li>
                        <span>Phone:</span> {'(123) 34567890'}
                    </li>
                    <li>
                        <span>Email:</span> email@example.com
                    </li>
                </ul>
            </aside>
            <Card>
                <form>{children}</form>
            </Card>
        </section>
    );
};

export default ContactForm;
