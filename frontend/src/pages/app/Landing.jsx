import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const Landing = () => {
    const dispatch = useDispatch();

    dispatch(uiActions.showAuthButtons()); // show the login and get started buttons

    return (
        <main>
            <h2>Landing Page</h2>
        </main>
    );
};

export default Landing;
