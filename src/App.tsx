import React, { useState } from 'react';
import PhotoQuiz from './PhotoQuiz';
import './App.css';

const App: React.FC = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleStartQuiz = () => {
        if (!name || !surname) {
            setShowAlert(true);
            return;
        }
        setShowAlert(false);
        setQuizStarted(true);
    };

    const handleAnswersSubmit = async (answers: string[]) => {
        const data = `Answers:\n${answers.join('\n')}`;
        try {
            await fetch('/save-answers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data }),
            });
            alert('Answers saved successfully!');
        } catch (error) {
            alert('Failed to save answers.');
        }
    };

    return (
        <div className="App">
            <h1>Photo Quiz</h1>
            {!quizStarted ? (
                <div className="intro-container">
                    {showAlert && <div className="alert">Please fill in your name and surname to proceed.</div>}
                    <img src="/photo/introphoto.png" alt="Intro" className="intro-image" />
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
                    <button className="start-button" onClick={handleStartQuiz}>Start Quiz</button>
                </div>
            ) : (
                <PhotoQuiz onComplete={handleAnswersSubmit} />
            )}
        </div>
    );
};

export default App;