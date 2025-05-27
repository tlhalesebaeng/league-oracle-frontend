import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui/ui-slice.js';
import View from '../../components/app/View.jsx';

const ViewTeam = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uiActions.showAuthButtons());
    }, []);

    return <View />;
};

export default ViewTeam;
