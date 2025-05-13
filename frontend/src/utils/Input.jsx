import './input.css';

const Input = ({
    placeholder,
    label,
    type,
    value,
    className,
    onImageClick,
    onInputChange,
    imgSrc,
}) => {
    return (
        <>
            {label && <label>{label}</label>}
            <input
                onChange={onInputChange}
                className={className || 'input'}
                type={type}
                placeholder={placeholder}
                value={value}
            />
            {imgSrc && (
                <img
                    className="input-img"
                    onClick={onImageClick}
                    src={imgSrc}
                />
            )}
        </>
    );
};

export default Input;
