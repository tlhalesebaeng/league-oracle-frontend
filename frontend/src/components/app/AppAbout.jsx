import './AppAbout.css';

const AppAbout = ({ aboutList }) => {
    return (
        <div className="app-about">
            <h2>About League Oracle Project</h2>
            {aboutList.map((aboutItem) => (
                <section key={aboutItem.heading}>
                    <h3>{aboutItem.heading}</h3>
                    <p>{aboutItem.description}</p>
                </section>
            ))}
        </div>
    );
};

export default AppAbout;
