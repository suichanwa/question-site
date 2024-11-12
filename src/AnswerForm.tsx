import React, { useState } from 'react';

const AnswerForm: React.FC = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [answers, setAnswers] = useState(['', '', '']);
    const [error, setError] = useState('');

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (!name || !surname) {
            setError('Please fill in your name and surname to proceed.');
            return;
        }
        setError(''); // Clear any previous error
        
        // Send the data to backend API to save to .txt file
    };

    return (
        <div>
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
                {[1, 2, 3].map((num, index) => (
                    <div key={num}>
                        <img src={`/photo/photo${num}.jpg`} alt={`Photo ${num}`} style={{ width: '300px', height: 'auto' }} />
                        <textarea
                            placeholder={`Describe Photo ${num}`}
                            value={answers[index]}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                        />
                    </div>
                ))}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleSubmit}>Submit Answers</button>
        </div>
    );
};

export default AnswerForm;
