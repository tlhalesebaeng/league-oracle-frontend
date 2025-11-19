import CoreFeatureItem from '../core-features-item/CoreFeatureItem.jsx';
import './CoreFeaturesList.css';

const CoreFeaturesList = ({ list = [] }) => {
    return (
        <ul className="core-features-list">
            {list.map((feature) => (
                <CoreFeatureItem key={feature.id} feature={feature} />
            ))}
        </ul>
    );
};

export default CoreFeaturesList;
