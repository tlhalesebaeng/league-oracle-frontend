import FooterContact from '../footer-contact/FooterContact.jsx';
import FooterDetail from '../footer-details/FooterDetail.jsx';
import './Footer.css';

const Footer = ({ footerDetails = [], contactDetails }) => {
    // Determine the current year (displayed on the copy right section)
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <section className="footer">
            <div className="footer-details">
                <div className="footer-details__app-details">
                    <h3>League Oracle</h3>
                    <p>
                        The ultimate platform to create and easily manage your
                        leagues, update fixture details and add fixture results
                        with little to no effort
                    </p>
                </div>
                {footerDetails.map((detail) => (
                    <FooterDetail detail={detail} key={detail.id} />
                ))}
                <FooterContact contactDetails={contactDetails} />
            </div>
            <div className="footer-copyright">
                <p>
                    Copyright © {currentYear} League Oracle. All rights reserved
                </p>
            </div>
        </section>
    );
};

export default Footer;
