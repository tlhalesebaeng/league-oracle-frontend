import { useRouteLoaderData } from 'react-router-dom';
import StandingItem from './StandingItem.jsx';
import './Standings.css';

const Standings = () => {
    const data = useRouteLoaderData('league-route');
    const leagueId = data.league._id;
    const standings = data.league.teams;

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
                    {standings.map((team) => (
                        <StandingItem
                            key={team.id}
                            leagueId={leagueId}
                            {...team}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Standings;
