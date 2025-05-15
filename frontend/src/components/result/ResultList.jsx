import ResultItem from './ResultItem.jsx';
import Button from '../../utils/Button.jsx';
import './ResultList.css';

const ResultList = ({ results }) => {
    const handleAddResults = () => {
        // guide the user on how to add a result using a modal
        // navigate to the fixtures page afterwards
    };

    return (
        <ul className="result-list">
            {results &&
                results.length !== 0 &&
                results.map((result) => (
                    <ResultItem key={result.id} result={result} />
                ))}
            {(!results || results.length === 0) && (
                <li className="no-results">
                    <p>No results found</p>
                    <div>
                        <Button onClick={handleAddResults}>Add</Button>
                    </div>
                </li>
            )}
        </ul>
    );
};

export default ResultList;
