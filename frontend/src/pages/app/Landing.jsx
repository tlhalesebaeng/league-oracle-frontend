import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { uiActions } from '../../store/ui/ui-slice.js';
import Features from '../../components/landing/Features.jsx';
import GetInTouch from '../../components/landing/GetInTouch.jsx';
import Footer from '../../components/app/Footer.jsx';
import Header from '../../components/landing/Header.jsx';
import HowItWorks from '../../components/landing/HowItWorks.jsx';

const Landing = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const howItWorksRef = useRef(null);

    useEffect(() => {
        dispatch(uiActions.showAuthButtons()); // show the login and get started buttons
    }, []);

    if (isAuth) return <Navigate to="/home" />;

    return (
        <main>
            <Header howItWorksRef={howItWorksRef} />
            <Features />
            <GetInTouch />
            <HowItWorks ref={howItWorksRef} />
            <Footer />
        </main>
    );
};

export default Landing;
