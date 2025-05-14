import Input from '../../../utils/Input.jsx';
import LeagueList from './LeagueList.jsx';

const SearchModal = () => {
    return (
        <>
            <Input type="text" className="modal-input" />
            <LeagueList />
        </>
    );
};

export default SearchModal;
