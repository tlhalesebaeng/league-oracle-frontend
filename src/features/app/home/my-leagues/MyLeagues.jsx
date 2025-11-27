import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../../../store/ui/ui-slice.js';
import { sidebarActions } from '../../../../store/ui/sidebar-slice.js';

import Button from '../../../../components/app/button/Button.jsx';
import Spinner from '../../../../components/app/spinner/Spinner.jsx';
import './MyLeagues.css';

const MyLeagues = ({ leagues, loading, type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreate = () => {
        navigate('/leagues/create');
    };

    const handleShowLeague = (leagueId) => {
        // Set the tab to be standing and navigate to the leagues page
        dispatch(uiActions.setTab('Standings'));
        dispatch(sidebarActions.hideSidebar());

        // This is not declarative and its not recommeded to do this, but i cant find a better easy way :(
        document.getElementsByTagName('body')[0].style.overflow = 'visible';

        navigate(`/leagues/${leagueId}`);
    };

    // this will short long names (24+ character) by adding dots after some characters
    const shortenName = (name) => {
        if (name.length < 24) {
            return name;
        }

        let result = '';
        for (let i = 0; i < 24; i++) {
            result += name[i];
        }
        result += '...';

        return result;
    };

    if (loading) {
        return (
            <aside className={`my-leagues no-leagues ${type}`}>
                <div className="my-leagues__spinner spinner__wrapper">
                    <Spinner />
                </div>
            </aside>
        );
    }

    if (!leagues || leagues.length === 0) {
        return (
            <aside className={`my-leagues no-leagues ${type}`}>
                <p>No leagues found</p>
                <section>
                    <Button onClick={handleCreate}>Create</Button>
                </section>
            </aside>
        );
    }

    return (
        <aside className={`my-leagues ${type}`}>
            <h3>My leagues</h3>
            <ul>
                {leagues.map((league) => {
                    const name = shortenName(league.name);
                    return (
                        <li
                            onClick={() => handleShowLeague(league.id)}
                            key={league.id}
                        >
                            {name}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default MyLeagues;
