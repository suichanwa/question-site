import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PhotoQuiz from './PhotoQuiz';
import Results from './Results';
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
        const data = {
            name,
            surname,
            answers,
        };
        try {
            const response = await fetch('https://13b9-46-166-62-135.ngrok-free.app ', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.text();
            alert(result);
        } catch (error) {
            alert('Failed to save answers.');
        }
    };

    return (
        <div className="App container">
            <Routes>
                <Route path="/" element={
                    <>
                        <h1 className="my-4">Photo Quiz</h1>
                        {!quizStarted ? (
                            <div className="intro-container text-center">
                                {showAlert && <div className="alert alert-danger">Please fill in your name and surname to proceed.</div>}
                                <img src="/photo/introphoto.png" alt="Intro" className="intro-image img-fluid rounded mb-4" />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                                <button className="btn btn-primary" onClick={handleStartQuiz}>Start Quiz</button>
                            </div>
                        ) : (
                            <PhotoQuiz onComplete={handleAnswersSubmit} name={name} surname={surname} />
                        )}
                    </>
                } />
                <Route path="/results" element={<Results name={name} surname={surname} />} />
            </Routes>
        </div>
    );
};

export default App;