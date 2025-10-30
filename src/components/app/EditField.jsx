import { useState } from 'react';
import Input from '../../utils/Input.jsx';
import pencilImg from '../../assets/pencil.png';
import closeImg from '../../assets/close.png';
import './EditField.css';

// tag allows us to render a dynamic jsx tag
const EditField = (props) => {
    const [showInput, setShowInput] = useState(false);
    const Tag = props.tag || 'p';

    if (showInput) {
        return (
            <section className="edit-field">
                <Input
                    onInputChange={(event) =>
                        props.onInputChange(event.target.value)
                    }
                    placeholder={props.placeholder}
                    type={props.type}
                    value={props.value}
                />
                <img onClick={() => setShowInput(false)} src={closeImg} />
            </section>
        );
    }

    return (
        <div className="edit-field">
            <Tag>{props.value || props.placeholder}</Tag>
            <img onClick={() => setShowInput(true)} src={pencilImg} />
        </div>
    );
};

export default EditField;
