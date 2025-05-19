import { Link } from 'react-router-dom';
import StandingField from './StandingField.jsx';
import './StandingItem.css';

const Standing = (props) => {
    const items = [
        { id: 'i1', value: props.teamPosition },
        {
            id: 'i2',
            value: props.name,
            type: 'name',
            class: 'league-standings__heading-field',
        },
        { id: 'i3', value: props.playedGames },
        { id: 'i4', value: props.wins },
        { id: 'i5', value: props.draws },
        { id: 'i6', value: props.loses },
        { id: 'i7', value: props.goalsFoward },
        { id: 'i8', value: props.goalsAgainst },
        { id: 'i9', value: props.goalDifference },
        {
            id: 'i10',
            value: props.points,
            class: 'league-standings__points-field',
        },
    ];

    return (
        <tr className="league-standings__row">
            {items.map((item) => {
                if (item.type === 'name') {
                    return (
                        <StandingField key={item.id} className={item.class}>
                            <Link
                                to={`/leagues/${props.leagueId}/teams/${props.id}`}
                                state={item.value}
                            >
                                {item.value}
                            </Link>
                        </StandingField>
                    );
                }

                return (
                    <StandingField key={item.id} className={item.class || ''}>
                        {item.value}
                    </StandingField>
                );
            })}
        </tr>
    );
};

export default Standing;
