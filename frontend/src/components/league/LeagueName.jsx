import { useState } from 'react';
import pencilImg from '../../assets/pencil.png';
import closeImg from '../../assets/close.png';
import './LeagueName.css';
import Input from '../../utils/Input';

const LeagueName = ({ name }) => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState(name);

    const handleChange = (value) => {
        setInputValue(value);
    };

    if (showInput) {
        return (
            <section className="league-name">
                <Input
                    onInputChange={(event) => handleChange(event.target.value)}
                    placeholder={name}
                    value={inputValue}
                />
                <img onClick={() => setShowInput(false)} src={closeImg} />
            </section>
        );
    }

    return (
        <section className="league-name">
            <h2>{name}</h2>
            <img onClick={() => setShowInput(true)} src={pencilImg} />
        </section>
    );
};

export default LeagueName;
