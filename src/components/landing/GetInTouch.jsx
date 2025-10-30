import Button from '../../utils/Button.jsx';
import './GetInTouch.css';

const GetInTouch = ({ onGetInTouch }) => {
    return (
        <section className="get-in-touch">
            <h2>Get In Touch With Us</h2>
            <p>
                Contact us for special request or notices and our team will get
                right back to you as soon as possible
            </p>
            <div className="btn-get-in-touch">
                <Button onClick={onGetInTouch} type="no-bg">
                    Get in touch
                </Button>
            </div>
        </section>
    );
};

export default GetInTouch;
