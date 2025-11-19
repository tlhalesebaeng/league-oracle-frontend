import ReactDOM from 'react-dom';
import Spinner from '../spinner/Spinner.jsx';
import Backdrop from '../../../modals/backdrop/Backdrop.jsx';
import './PageSpinner.css';

// this component is used to show a spinner on page loaders
const PageSpinner = () => {
    return (
        <>
            <Backdrop />
            {ReactDOM.createPortal(
                <div className="page__spinner">
                    <Spinner />
                </div>,
                document.getElementById('spinner-hook')
            )}
        </>
    );
};

export default PageSpinner;
