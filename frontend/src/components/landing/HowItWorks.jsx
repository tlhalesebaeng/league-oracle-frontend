import { useState } from 'react';
import Card from '../app/Card.jsx';
import './HowItWorks.css';

const steps = [
    {
        id: 'step-1',
        title: 'Create league',
        description:
            'After logging in, click on the plus (+) sign on the top left corner to create a league with any amount of teams',
        showDesc: true,
    },
    {
        id: 'step-2',
        title: 'Update fixture details',
        description:
            'Navigate to the fixtures tab and click generate to create season fixtures for your league. Then click "versus" and update the fixture detail of your choice',
        showDesc: false,
    },
    {
        id: 'step-3',
        title: 'Add a fixture result',
        description:
            'To add a new fixture result, navigate to the fixture and click "versus". On the buttons shown click "add result" to add team scores of the fixture of your choice',
        showDesc: false,
    },
];

const HowItWorks = ({ ref }) => {
    const [stepsDetails, setStepsDetails] = useState(steps);

    const handleHideDescription = (index) => {
        setStepsDetails((prevDetails) => {
            const newDetails = prevDetails.map((detail, detailIndex) => {
                const newDetail = { ...detail };
                if (index === detailIndex) {
                    newDetail.showDesc = true;
                } else {
                    newDetail.showDesc = false;
                }

                return newDetail;
            });

            console.log(newDetails);
            return newDetails;
        });
    };

    return (
        <section ref={ref} className="how-it-works">
            <h2>How It Works</h2>
            <ul>
                {stepsDetails.map((step, index) => (
                    <Card
                        className={step.showDesc ? ' shown' : ''}
                        onClick={() => handleHideDescription(index)}
                        key={step.id}
                    >
                        <li>
                            <div className="how-it-works__top-part">
                                <p>{index + 1}</p>
                                <h3>{step.title}</h3>
                            </div>
                            {step.showDesc && (
                                <p className="how-it-works__description">
                                    {step.description}
                                </p>
                            )}
                        </li>
                    </Card>
                ))}
            </ul>
        </section>
    );
};

export default HowItWorks;
