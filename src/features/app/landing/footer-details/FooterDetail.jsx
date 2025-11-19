import { useNavigate } from 'react-router-dom';
import './FooterDetail.css';

const FooterDetail = ({ detail = { links: [] } }) => {
    const navigate = useNavigate();

    return (
        <div className="footer-details__links">
            <h3>{detail.title}</h3>
            {detail.links.map((link) => (
                <div key={link.name}>
                    <a onClick={() => navigate(link.to)}>{link.name}</a>
                </div>
            ))}
        </div>
    );
};

export default FooterDetail;
