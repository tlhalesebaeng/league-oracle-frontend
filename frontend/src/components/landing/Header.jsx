import { useNavigate } from 'react-router-dom';
import Button from '../../utils/Button.jsx';
import './Header.css';

const Header = ({ howItWorksRef }) => {
    const navigate = useNavigate();
    // this will scroll down to the how it works section
    const handleScroll = () => {
        howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <header className="landing-header">
            <section className="landing-header__details">
                <h2>
                    The ultimate platform for effortlessly managing your leagues
                </h2>
                <p>
                    Managing a league, particularly one that spans several
                    months, can be highly challenging. While many high-quality
                    platforms offer these services at a cost, this platform is
                    designed to provide them completely free of charge. From
                    managing leagues and updating fixture details—such as
                    venues, dates, and more—to adding match results, everything
                    is made simple and efficient with this exceptional,
                    free-to-use tool.
                </p>
                <div className="landing-header__buttons">
                    <Button onClick={() => navigate('/signup')}>
                        Get started
                    </Button>
                    <Button onClick={handleScroll} type="no-bg">
                        How it works
                    </Button>
                </div>
            </section>
            <img alt="league-image" />
        </header>
    );
};

export default Header;
