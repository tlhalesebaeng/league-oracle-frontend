import ResultItem from './ResultItem.jsx';
import Button from '../../utils/Button.jsx';
import './ResultList.css';

const ResultList = ({ results }) => {
    const handleAddResults = () => {
        // navigate to the add results page
    };

    return (
        <ul className="result-list">
            {results.length !== 0 &&
                results.map((result) => (
                    <ResultItem key={result.id} {...result} />
                ))}
            {results.length === 0 && (
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
