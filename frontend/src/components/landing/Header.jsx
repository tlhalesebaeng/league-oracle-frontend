import Button from '../../utils/Button.jsx';
import exampleStandingImg from '../../assets/example-standings.png';
import './Header.css';

const Header = ({ onScroll, onGetStarted }) => {
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
                    <Button onClick={onGetStarted}>Get started</Button>
                    <Button onClick={onScroll} type="no-bg">
                        How it works
                    </Button>
                </div>
            </section>
            <section className="landing-header__image">
                <img src={exampleStandingImg} alt="league-image" />
            </section>
        </header>
    );
};

export default Header;
