import ResultItem from './ResultItem';
import './ResultList.css';

const ResultList = ({ results }) => {
    return (
        <ul className="result-list">
            {results.map((result) => (
                <ResultItem key={result.id} {...result} />
            ))}
        </ul>
    );
};

export default ResultList;
