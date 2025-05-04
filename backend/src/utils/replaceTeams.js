// intermediate function for replacing team ids with actual league teams
const replaceTeams = (dbTeam, teams, result) => {
    // add homeTeam
    teams.forEach((team) => {
        if (dbTeam.awayTeam.equals(team._id)) {
            result['awayTeam'] = team;
        }
    });

    // add awayTeam
    teams.forEach((team) => {
        if (dbTeam.homeTeam.equals(team._id)) {
            result['homeTeam'] = team;
        }
    });
};

export default replaceTeams;
