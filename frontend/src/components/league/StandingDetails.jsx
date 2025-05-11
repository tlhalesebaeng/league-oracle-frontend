import './StandingDetails.css';

const Details = ({ leaguename, dateCreated, teamName }) => {
    return (
        <section className="league-details">
            <h2>{leaguename}</h2>
            {teamName && <h3>{teamName}</h3>}
            <p>{dateCreated}</p>
        </section>
    );
};

export default Details;
