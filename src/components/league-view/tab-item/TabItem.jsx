import './TabItem.css';

const TabItem = ({ onClick, className, children }) => {
    return (
        <li
            onClick={onClick}
            className={`tab-list__item${className ? ' ' + className : ''}`}
        >
            {children}
        </li>
    );
};

export default TabItem;
