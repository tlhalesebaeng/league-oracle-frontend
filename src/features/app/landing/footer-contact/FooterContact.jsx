import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/app/button/Button.jsx';
import './FooterContact.css';

const FooterContact = ({ contactDetails = {} }) => {
    const navigate = useNavigate();

    return (
        <div className="footer-details__contact">
            <h3>{contactDetails.title}</h3>
            <p className="footer-details__contact-email">
                {contactDetails.email}
            </p>
            <p>{contactDetails.street}</p>
            <p>{contactDetails.address}</p>
            <div className="footer-details__contact-button">
                <Button onClick={() => navigate('/contact')}>
                    Get in touch
                </Button>
            </div>
        </div>
    );
};

export default FooterContact;
