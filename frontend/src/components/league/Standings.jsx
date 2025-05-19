import { useRouteLoaderData } from 'react-router-dom';
import StandingItem from './StandingItem.jsx';
import './Standings.css';

const Standings = () => {
    const data = useRouteLoaderData('league-route');
    const leagueId = data.league._id;
    const standings = data.league.teams;

    // TODO: cache this function using useCallback
    const sortStandings = () => {
        // bubble sort is used to sort the teams in descending order of points
        // as first preference, goal difference as second and goal foward as third

        for (let i = 0; i < standings.length; i++) {
            for (let j = 0; j < standings.length; j++) {
                let standing1 = standings[i];
                let standing2 = standings[j];

                if (standing1.points > standing2.points) {
                    // swap
                    [standing1, standing2] = [standing2, standing1];
                } else if (
                    standing1.points === standing2.points &&
                    standing1.goalDifference > standing2.goalDifference
                ) {
                    [standing1, standing2] = [standing2, standing1];
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
                                className="league-standings__header-field"
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
