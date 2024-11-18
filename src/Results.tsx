import React, { useEffect, useState } from 'react';
import './Results.css';

const Results: React.FC<{ name: string, surname: string }> = ({ name, surname }) => {
    const [results, setResults] = useState<string | null>(null);
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
    const [parsedResults, setParsedResults] = useState<any[]>([]);
    const [correctCount, setCorrectCount] = useState(0);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('https://question-site-backend.onrender.com/get-answers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, surname }),
                });
                const result = await response.text();
                setResults(result);
            } catch (error) {
                alert('Failed to fetch results.');
            }
        };

        const fetchCorrectAnswers = async () => {
            try {
                const response = await fetch('https://question-site-backend.onrender.com/correct-answers');
                const data = await response.json();
                setCorrectAnswers(data);
            } catch (error) {
                alert('Failed to fetch correct answers.');
            }
        };

        fetchResults();
        fetchCorrectAnswers();
    }, [name, surname]);

    useEffect(() => {
        if (results && correctAnswers.length > 0) {
            const userAnswers = results.split('\n').filter(answer => answer.trim() !== '' && !answer.startsWith('Your answers:'));
            const parsedResults = userAnswers.slice(0, correctAnswers.length).map((answer, index) => ({
                question: `Question ${index + 1}`,
                userAnswer: answer.trim(),
                correctAnswer: correctAnswers[index]?.trim(),
                isCorrect: answer.trim() === correctAnswers[index]?.trim()
            }));

            const correctCount = parsedResults.filter(result => result.isCorrect).length;
            setParsedResults(parsedResults);
            setCorrectCount(correctCount);
        }
    }, [results, correctAnswers]);

    const totalQuestions = correctAnswers.length;
    const correctPercentage = (correctCount / totalQuestions) * 100;
    const incorrectPercentage = 100 - correctPercentage;

    return (
        <div className="results container mt-4">
            <h2>Your Results</h2>
            {results ? (
                <div>
                    {parsedResults.map((result, index) => (
                        <div key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                            <p><strong>{result.question}</strong></p>
                            <p>Your answer: {result.userAnswer}</p>
                            <p>Correct answer: {result.correctAnswer}</p>
                        </div>
                    ))}
                    <div className="progress-bar-container">
                        <div className="progress-bar correct" style={{ width: `${correctPercentage}%` }}></div>
                        <div className="progress-bar incorrect" style={{ width: `${incorrectPercentage}%` }}></div>
                    </div>
                    <p>Correct answers: {correctPercentage.toFixed(2)}%</p>
                    <p>Incorrect answers: {incorrectPercentage.toFixed(2)}%</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Results;