import './StandingDetails.css';

const Details = ({ id, name, dateCreated }) => {
    return (
        <section className="league-details">
            <h2>{name}</h2>
            <p>{dateCreated}</p>
        </section>
    );
};

export default Details;
