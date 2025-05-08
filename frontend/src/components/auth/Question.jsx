import { NavLink } from 'react-router-dom';
import './Question.css';

const Question = ({ link, linkText, children }) => {
    return (
        <section className="question">
            <p>{children}</p>
            <NavLink to={link}>{linkText}</NavLink>
        </section>
    );
};

export default Question;
