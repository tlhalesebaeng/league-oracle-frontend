import './Input.css';

const Input = (props) => {
    if (props.kind === 'text-area') {
        return (
            <>
                {props.label && <label>{props.label}</label>}
                <textarea
                    ref={props.ref}
                    onChange={props.onInputChange}
                    className={props.className || 'textarea'}
                    placeholder={props.placeholder}
                    value={props.value}
                ></textarea>
            </>
        );
    }

    return (
        <>
            {props.label && <label>{props.label}</label>}
            <input
                ref={props.ref}
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
