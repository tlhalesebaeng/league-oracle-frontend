import Card from '../app/Card.jsx';
import './Features.css';

const Features = ({ featuresList }) => {
    return (
        <div className="features">
            <h2>Core Features</h2>
            <p className="features__message">
                Explore core features that this platform offers below. Feel free
                to get started with us to use all this great features
            </p>
            <ul>
                {featuresList.map((feature) => (
                    <Card key={feature._id}>
                        <li>
                            <img src={feature.imgSrc} />
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </li>
                    </Card>
                ))}
            </ul>
        </div>
    );
};

export default Features;
