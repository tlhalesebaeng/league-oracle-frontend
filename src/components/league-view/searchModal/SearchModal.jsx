import { useEffect, useState } from 'react';
import useDebounceValue from '../../../hooks/useDebounceValue.js';
import { useFetch } from '../../../hooks/useFetch.js';

import Input from '../../app/input/Input.jsx';
import LeagueList from './LeagueList.jsx';
import Spinner from '../../app/spinner/Spinner.jsx';
import './SearchModal.css';

const SearchModal = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [leagues, setLeagues] = useState([]);
    const [noLeagues, setNoLeagues] = useState(false);
    const { request, error, setError, isLoading } = useFetch();
    const debounceValue = useDebounceValue(searchPhrase);

    useEffect(() => {
        const getLeagues = async () => {
            if (debounceValue) {
                // reset errors if any
                setError('');

                // reset whether we have leagues found or not
                setNoLeagues(false);

                // send the request with the debounce value
                const response = await request(
                    `/leagues?name=${debounceValue}`,
                    'get'
                );

                if (response) {
                    const responseLeagues = response.data;
                    if (responseLeagues.length) setLeagues(responseLeagues);
                    else setNoLeagues(true);
                }
            } else {
                setLeagues([]); // reset the leagues since we are not searching for anything
            }
        };
        getLeagues();
    }, [debounceValue]);

    return (
        <>
            <Input
                onInputChange={(event) => setSearchPhrase(event.target.value)}
                value={searchPhrase}
                type="text"
                className="search-modal__input"
            />
            <div className="search-modal-message">
                {error && <p className="error-message">{error}</p>}
                {isLoading && (
                    <div className="search-modal__spinner spinner__wrapper">
                        <Spinner />
                    </div>
                )}
                {noLeagues && <p>No leagues found</p>}
            </div>
            <LeagueList leagues={leagues} />
        </>
    );
};

export default SearchModal;
