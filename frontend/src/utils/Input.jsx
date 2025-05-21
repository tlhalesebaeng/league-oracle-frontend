import './input.css';

const Input = (props) => {
    return (
        <>
            {props.label && <label>{props.label}</label>}
            <input
                onChange={props.onInputChange}
                className={props.className || 'input'}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
            />
            {props.imgSrc && (
                <img
                    className="input-img"
                    onClick={props.onImageClick}
                    src={props.imgSrc}
                />
            )}
        </>
    );
};

export default Input;
