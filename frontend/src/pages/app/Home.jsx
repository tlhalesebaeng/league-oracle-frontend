import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MyLeagues from '../../components/league/MyLeagues.jsx';

const Home = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    const leagues = [
        {
            id: 'l1',
            name: 'Tlhalefos League',
            created: '10-04-2025',
        },
        {
            id: 'l2',
            name: 'Sebaeng League',
            created: '07-09-2020',
        },
        {
            id: 'l3',
            name: 'Kagiso League',
            created: '20-01-2024',
        },
    ];

    if (!isAuth) return <Navigate to="/" />; // this will help us to avoid loading the jsx which happens when using useEffect

    return (
        <div className="layout-content">
            <MyLeagues />
            <main>
                <h2>Home Page</h2>
            </main>
        </div>
    );
};

export default Home;
