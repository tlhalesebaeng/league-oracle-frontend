import { Link } from 'react-router-dom';
import './Question.css';

const Question = ({ link, linkText, children }) => {
    return (
        <section className="question">
            <p>{children}</p>
            <Link to={link}>{linkText}</Link>
        </section>
    );
};

export default Question;
