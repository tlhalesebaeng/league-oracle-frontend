import { useState } from 'react';
import Card from '../app/Card.jsx';
import './HowItWorks.css';

const HowItWorks = ({ ref, stepsList }) => {
    const [shownStep, setShownStep] = useState(stepsList[0].id);

    return (
        <section ref={ref} className="how-it-works">
            <h2>How It Works</h2>
            <ul>
                {stepsList.map((step, index) => {
                    // Check if the current step is shown
                    const showDesc = step.id === shownStep;

                    return (
                        <Card
                            className={showDesc ? ' shown' : ''}
                            onClick={() => setShownStep(step.id)}
                            key={step.id}
                        >
                            <li>
                                <div className="how-it-works__top-part">
                                    <p>{index + 1}</p>
                                    <h3>{step.title}</h3>
                                </div>
                                {showDesc && (
                                    <p className="how-it-works__description">
                                        {step.description}
                                    </p>
                                )}
                            </li>
                        </Card>
                    );
                })}
            </ul>
        </section>
    );
};

export default HowItWorks;
