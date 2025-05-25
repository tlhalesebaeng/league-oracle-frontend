import { useState } from 'react';
import Input from '../../utils/Input.jsx';
import pencilImg from '../../assets/pencil.png';
import closeImg from '../../assets/close.png';
import './EditField.css';

// tag allows us to render a dynamic jsx tag
const EditField = ({ value, tag: Tag = 'p', onInputChange, placeholder }) => {
    const [showInput, setShowInput] = useState(false);

    if (showInput) {
        return (
            <section className="edit-field">
                <Input
                    onInputChange={(event) => onInputChange(event.target.value)}
                    placeholder={placeholder}
                    value={value}
                />
                <img onClick={() => setShowInput(false)} src={closeImg} />
            </section>
        );
    }

    return (
        <div className="edit-field">
            <Tag>{value || placeholder}</Tag>
            <img onClick={() => setShowInput(true)} src={pencilImg} />
        </div>
    );
};

export default EditField;
