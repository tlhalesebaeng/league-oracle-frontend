import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditField from '../app/EditField.jsx';
import './FixtureHeader.css';
import Input from '../../utils/Input.jsx';

const FixtureHeader = (props) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    // get the data in this way to make code readable
    const { league, fixtureDate, fixtureTime, onEdit, editData } = props;

    // check if the user is the league creator to be able to edit the fixture date and time
    const isCreator = league.creator === user._id;

    // allow editing the date and time when the user is logged in and is the league creator
    let paragraph = null;
    if (isAuth && isCreator) {
        paragraph = (
            <div className="fixture-header__paragraph">
                <EditField
                    onInputChange={(value) => onEdit('date', value)}
                    tag="span"
                    type="date"
                    value={editData.date}
                />
                |
                <EditField
                    onInputChange={(value) => onEdit('time', value)}
                    tag="span"
                    type="time"
                    value={editData.time}
                />
            </div>
        );
    } else {
        paragraph = (
            <p>
                <span>{fixtureDate}</span> | <span>{fixtureTime}</span>
            </p>
        );
    }

    return (
        <section className="fixture-header">
            <div className="fixture-header__container">
                <h2 onClick={() => navigate(`/leagues/${league._id}`)}>
                    {league.name}
                </h2>
                {paragraph}
            </div>
        </section>
    );
};

export default FixtureHeader;
