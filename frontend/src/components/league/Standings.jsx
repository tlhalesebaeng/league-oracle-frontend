import StandingItem from './StandingItem.jsx';
import './Standings.css';

const Standings = ({ standings }) => {
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
                        <StandingItem key={team.id} {...team} />
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Standings;
