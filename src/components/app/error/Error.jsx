import { useNavigate } from 'react-router-dom';
import Button from '../button/Button.jsx';
import arrowImg from '../../../assets/left-arrow.png';
import './Error.css';

const Error = ({ error }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="app-error">
                <p className="app-error__status">{error.status}</p>
                <div className="app-error__details">
                    <h1>{error.title}</h1>
                    <p>{error.message}</p>
                    <div className="app-error__buttons">
                        <div>
                            <Button onClick={() => navigate('..')} type="no-bg">
                                <img src={arrowImg} /> Go back
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => navigate('/')}>
                                Take me home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Error;
