import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { uiActions } from '../../../store/ui/ui-slice.js';

import CoreFeatures from './core-features/CoreFeatures.jsx';
import GetInTouch from './contact/GetInTouch.jsx';
import Footer from './footer/Footer.jsx';
import Header from './header/Header.jsx';
import HowItWorks from './instructions/HowItWorks.jsx';
import calendarImg from '../../../assets/calendar.png';
import resultImg from '../../../assets/result.png';
import leagueImg from '../../../assets/league.png';

const Landing = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const howItWorksRef = useRef(null); // Used to scroll to the how it works section

    useEffect(() => {
        // Show the login and get started buttons
        dispatch(uiActions.showAuthButtons());
    }, []);

    // Make this page accessible users that are not logged in only
    if (isAuth) return <Navigate to="/home" />;

    // Function that handles the how it works button click (header component)
    const handleScroll = () => {
        // Scroll down to the how it works section
        howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // Function that handles the get started button click  (header component)
    const handleGetStarted = () => {
        navigate('/signup');
    };

    const handleGetInTouch = () => {
        navigate('/contact');
    };

    // List of all the features displayed on the features section (features component)
    const featuresList = [
        {
            id: 'f1',
            imgSrc: leagueImg,
            imgAltText: 'league',
            title: 'League Management',
            description:
                'Create leagues with any amount of teams, update your leagues and browse other league with ease',
        },
        {
            id: 'f2',
            imgSrc: calendarImg,
            imgAltText: 'calendar',
            title: 'Fixture Handling',
            description:
                'Generate home and away season fixtures for your league, view league fixtures and easily update fixture details ',
        },
        {
            id: 'f3',
            imgSrc: resultImg,
            imgAltText: 'result',
            title: 'Results',
            description:
                'Simplified way to add fixture result, view league results and easily make update to your results with little effort',
        },
    ];

    // List of the steps that describe how our app works (how-it-works component)
    const stepsList = [
        {
            id: 'step-1',
            title: 'Create a league',
            description:
                'After successfully logging into your account, click on the plus (+) icon located at the top right corner of the page to create a league with any amount of teams',
        },
        {
            id: 'step-2',
            title: 'Update fixture details',
            description:
                'Navigate to the fixtures tab and click generate to create season fixtures for your league. Then click "versus" and update the fixture detail of your choice',
        },
        {
            id: 'step-3',
            title: 'Add a fixture result',
            description:
                'To add a new fixture result, navigate to the fixture and click "versus". On the buttons shown click "add result" to add team scores of the fixture of your choice',
        },
    ];

    // List of all the links shown on the footer and their titles
    const footerDetails = [
        {
            id: 'footer-detail-1',
            title: 'Information',
            links: [
                { to: '/about', name: 'About' },
                { to: '/contact', name: 'Contact' },
            ],
        },
        {
            id: 'footer-detail-2',
            title: 'Quick Access',
            links: [
                { to: '/login', name: 'Login' },
                { to: '/signup', name: 'Sign up' },
            ],
        },
    ];

    // Contact details that should be shown on the footer
    const contactDetails = {
        title: 'Contact Us',
        email: 'email@example.com',
        street: '432 Contact Street',
        address: 'Gauteng, Johannesburg 1234',
    };

    return (
        <main>
            <Header onScroll={handleScroll} onGetStarted={handleGetStarted} />
            <CoreFeatures featuresList={featuresList} />
            <GetInTouch onGetInTouch={handleGetInTouch} />
            <HowItWorks ref={howItWorksRef} stepsList={stepsList} />
            <Footer
                footerDetails={footerDetails}
                contactDetails={contactDetails}
            />
        </main>
    );
};

export default Landing;
