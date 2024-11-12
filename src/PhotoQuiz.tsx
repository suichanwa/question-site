import React, { useEffect, useState } from 'react';
import './PhotoQuiz.css';

const photos = [
    { src: '/photo/photo1.png', question: 'Ce culoare are cifra 35?', options: ['Roșu aprins', 'Albastru regal', 'Galben strălucitor'] },
    { src: '/photo/photo2.png', question: 'În ce zi a săptămânii se află ora 6?', options: ['Roșu intens', 'Roșu-albastru vibrant', 'Albastru-roșu electric'] },
    { src: '/photo/photo3.jpg', question: 'Ce oră arată ceasul?', options: ['13:23', '14:20', 'Fără 37 de minute ora 14'] },
    { src: '/photo/photo4.jpg', question: 'Câte puncte arată ora 8?', options: ['Două negre și două albe', 'Patru puncte distincte', 'Una neagră și trei albe'] },
    { src: '/photo/photo5.jpg', question: 'Ce culoare are peretele?', options: ['Alb imaculat', 'Negru profund', 'Gri elegant'] },
];

const PhotoQuiz: React.FC<{ onComplete: (answers: string[]) => void, name: string, surname: string }> = ({ onComplete, name, surname }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showPhoto, setShowPhoto] = useState(true);
    const [showResultsButton, setShowResultsButton] = useState(false);
    const [results, setResults] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPhoto(false);
        }, 5000); 

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (selectedAnswer) {
            setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
            setSelectedAnswer(null);
            setShowPhoto(true);
            if (currentIndex < photos.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                onComplete([...answers, selectedAnswer]); // Send all answers when done
                setShowResultsButton(true);
                setShowPhoto(false); // Hide the photo when the quiz is complete
            }
        } else {
            alert('Please select an answer before continuing.');
        }
    };

    const handleSeeResults = async () => {
        try {
            const response = await fetch('/get-answers', {
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

    return (
        <div className="photo-quiz">
            {showPhoto && currentIndex < photos.length && (
                <img
                    src={photos[currentIndex].src}
                    alt={`Description of photo ${currentIndex + 1}`}
                    className="photo-quiz-image"
                />
            )}
            {!showPhoto && currentIndex < photos.length && (
                <div>
                    <p>{photos[currentIndex].question}</p>
                    <p>Select an answer for the photo:</p>
                    {photos[currentIndex].options.map((option) => (
                        <label key={option}>
                            <input
                                type="radio"
                                name={`photo-${currentIndex}`}
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={() => handleAnswerSelection(option)}
                            />
                            {option}
                        </label>
                    ))}
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {showResultsButton && (
                <button className="results-button" onClick={handleSeeResults}>See Your Results</button>
            )}
            {results && (
                <div className="results">
                    <h2>Your Results</h2>
                    <pre>{results}</pre>
                </div>
            )}
        </div>
    );
};

export default PhotoQuiz;