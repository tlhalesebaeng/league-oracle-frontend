import Card from '../../../../components/app/card/Card.jsx';
import './CoreFeatureItem.css';

const CoreFeatureItem = ({ feature = {} }) => {
    return (
        <Card className="core-feature__card">
            <li className="core-feature__item">
                <img src={feature.imgSrc} alt={feature.imgAltText} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
            </li>
        </Card>
    );
};

export default CoreFeatureItem;
