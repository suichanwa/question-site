import React, { useState } from 'react';
import './MultipleChoice.css';

const MultipleChoice: React.FC<{ onSubmit: (answers: string[]) => void }> = ({ onSubmit }) => {
    const [answers, setAnswers] = useState(Array(3).fill(''));
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (!name || !surname) {
            setShowAlert(true);
            return;
        }
        setShowAlert(false);
        onSubmit(answers);
    };

    const options = [
        ['Option 1 for Photo 1', 'Option 2 for Photo 1', 'Option 3 for Photo 1'],
        ['Option 1 for Photo 2', 'Option 2 for Photo 2', 'Option 3 for Photo 2'],
        ['Option 1 for Photo 3', 'Option 2 for Photo 3', 'Option 3 for Photo 3'],
    ];

    return (
        <div className="multiple-choice-form">
            {showAlert && <div className="alert">Please fill in your name and surname to proceed.</div>}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            {options.map((choices, index) => (
                <div key={index}>
                    <p>Select an answer for Photo {index + 1}:</p>
                    {choices.map((choice) => (
                        <label key={choice}>
                            <input
                                type="radio"
                                name={`photo-${index}`}
                                value={choice}
                                checked={answers[index] === choice}
                                onChange={() => handleChange(index, choice)}
                            />
                            {choice}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Answers</button>
        </div>
    );
};

export default MultipleChoice;