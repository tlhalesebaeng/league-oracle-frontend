import InstructionsList from '../instructions-list/InstructionsList.jsx';
import './HowItWorks.css';

const HowItWorks = ({ ref, stepsList }) => {
    return (
        <section ref={ref} className="how-it-works">
            <h2>How It Works</h2>
            <InstructionsList list={stepsList} />
        </section>
    );
};

export default HowItWorks;
