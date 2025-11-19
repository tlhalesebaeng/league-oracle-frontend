import './StandingField.css';

const StandingField = ({ children, className }) => {
    return (
        <td
            className={`league-standings__field${
                className ? ' ' + className : ''
            }`}
        >
            {children}
        </td>
    );
};

export default StandingField;
