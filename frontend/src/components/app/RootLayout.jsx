import { Outlet } from 'react-router-dom';
import Navigation from '../navigation/Navigation.jsx';
import './RootLayout.css';

const RootLayout = () => {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
};

export default RootLayout;
