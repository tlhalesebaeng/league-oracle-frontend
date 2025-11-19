import { useRouteLoaderData } from 'react-router-dom';
import StandingItem from '../standing-item/StandingItem.jsx';
import './Standings.css';

const Standings = () => {
    const data = useRouteLoaderData('league-route');
    const leagueId = data.league.id;
    const standings = data.league.teams;

    // TODO: cache this function using useCallback
    const sortStandings = () => {
        // bubble sort is used to sort the teams in descending order of points
        // as first preference, goal difference as second and goal foward as third

        for (let i = 0; i < standings.length; i++) {
            for (let j = 0; j < standings.length; j++) {
                if (standings[i].points > standings[j].points) {
                    // swap
                    let standing = standings[i];
                    standings[i] = standings[j];
                    standings[j] = standing;
                }
            }
        }
    };

    sortStandings(); // call this function to sort the standings

    const tableHeaderFields = ['P', 'W', 'D', 'L', 'F', 'A', '+-', 'PTS'];
    return (
        <section className="league-standings">
            <table>
                <thead>
                    <tr>
                        <td className="league-standings__header-field">#</td>
                        <td className="league-standings__space-header"></td>
                        {tableHeaderFields.map((fieldName) => (
                            <td
                                key={fieldName}
                                className={`league-standings__header-field header-type__${fieldName}`}
                            >
                                {fieldName}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {standings.map((team, index) => (
                        <StandingItem
                            key={team.id}
                            leagueId={leagueId}
                            teamPosition={index + 1}
                            {...team}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Standings;
