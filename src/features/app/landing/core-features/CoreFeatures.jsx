import CoreFeaturesList from '../core-features-list/CoreFeaturesList.jsx';
import './CoreFeatures.css';

const CoreFeatures = ({ featuresList = [] }) => {
    return (
        <div className="core-features">
            <h2>Core Features</h2>
            <p className="core-features__message">
                Explore core features that this platform offers below. Feel free
                to get started with us to use all this great features
            </p>
            <CoreFeaturesList list={featuresList} />
        </div>
    );
};

export default CoreFeatures;
