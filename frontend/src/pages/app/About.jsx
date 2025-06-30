import AppAbout from '../../components/app/AppAbout.jsx';

const About = () => {
    const aboutList = [
        {
            heading: 'League Oracle',
            description:
                "League Oracle is a modern web application designed to simplify the organization, tracking, and communication of soccer leagues and/or tournaments. Whether you're managing a community league, or an esports competition, our platform gives you the tools to stay in control and keep participants and fans engaged.",
        },
        {
            heading: 'Our Purpose',
            description:
                "Managing a league shouldn't be chaotic. This system was built to eliminate manual tasks, reduce errors, and improve transparency in soccer league operations. By offering an all-in-one digital solution, we empower organizers, players, and fans to focus on what truly matters — the game.",
        },
        {
            heading: 'Why It Matters',
            description:
                'Too often, local leagues rely on spreadsheets, PDFs, or group chats to manage events. These outdated methods lead to confusion, missed games, and wasted time. League Oracle fills this gap with a user-friendly and an easy to use platform tailored to the needs of modern organizers.',
        },
    ];

    return (
        <main>
            <AppAbout aboutList={aboutList} />
        </main>
    );
};

export default About;
