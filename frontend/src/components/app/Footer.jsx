import Button from '../../utils/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const navigate = useNavigate();

    const currentDate = new Date(Date.now());
    const currentYear = currentDate.getFullYear();
    const footerDetails = [
        {
            _id: 'footer-detail-1',
            title: 'Information',
            links: [
                { to: '/about', name: 'About' },
                { to: '/contact', name: 'Contact' },
            ],
        },
        {
            _id: 'footer-detail-2',
            title: 'Quick Access',
            links: [
                { to: '/login', name: 'Login' },
                { to: '/signup', name: 'Sign up' },
            ],
        },
    ];
    return (
        <>
            <section className="footer">
                <div className="footer-details">
                    <div className="footer-details__app-details">
                        <h3>League Oracle</h3>
                        <p>
                            The ultimate platform to create and easily manage
                            your leagues, update fixture details and add fixture
                            results with little to no effort
                        </p>
                    </div>
                    {footerDetails.map((detail) => {
                        return (
                            <div
                                className="footer-details__links"
                                key={detail._id}
                            >
                                <h3>{detail.title}</h3>
                                {detail.links.map((link) => (
                                    <Link key={link.name} to={link.to}>
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        );
                    })}
                    <div className="footer-details__contact">
                        <h3>Contact Us</h3>
                        <p className="footer-details__contact-email">
                            email@example.com
                        </p>
                        <p>432 Contact Street</p>
                        <p>Gauteng, Johannesburg 1234</p>
                        <div className="footer-details__contact-button">
                            <Button onClick={() => navigate('/contact')}>
                                Get in touch
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <p>
                        Copyright © {currentYear} League Oracle. All rights
                        reserved
                    </p>
                </div>
            </section>
        </>
    );
};

export default Footer;
