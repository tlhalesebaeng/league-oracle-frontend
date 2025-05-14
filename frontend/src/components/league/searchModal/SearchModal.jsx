import Input from '../../../utils/Input.jsx';
import LeagueList from './LeagueList.jsx';
import './SearchModal.css';

const SearchModal = () => {
    return (
        <>
            <Input type="text" className="search-modal__input" />
            <LeagueList />
        </>
    );
};

export default SearchModal;
