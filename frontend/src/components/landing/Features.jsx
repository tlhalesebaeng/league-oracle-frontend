import Card from '../app/Card.jsx';
import calendarImg from '../../assets/calendar.png';
import resultImg from '../../assets/result.png';
import leagueImg from '../../assets/league.png';
import './Features.css';

const Features = () => {
    const features = [
        {
            _id: 'f1',
            imgSrc: leagueImg,
            title: 'League Management',
            description:
                'Create leagues with any amount of teams, update your leagues and browse other league with ease',
        },
        {
            _id: 'f2',
            imgSrc: calendarImg,
            title: 'Fixture Handling',
            description:
                'Generate home and away season fixtures for your league, view league fixtures and easily update fixture details ',
        },
        {
            _id: 'f3',
            imgSrc: resultImg,
            title: 'Results',
            description:
                'Simplified way to add fixture result, view league results and easily make update to your results with little effort',
        },
    ];
    return (
        <div className="features">
            <h2>Core Features</h2>
            <p className="features__message">
                Explore core features that this platform offers below. Feel free
                to get started with us to use all this great features
            </p>
            <ul>
                {features.map((feature) => (
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
