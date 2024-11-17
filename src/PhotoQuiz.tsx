import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PhotoQuiz.css';

const photos = [
    { src: 'photo/photo1.png', question: 'Ce culoare are cifra 35?', options: ['Roșu aprins', 'Albastru regal', 'Galben strălucitor'] },
    { src: 'photo/photo2.png', question: 'În ce zi a săptămânii se află ora 6?', options: ['Roșu intens', 'Roșu-albastru vibrant', 'Albastru-roșu electric'] },
    { src: 'photo/photo3.jpg', question: 'Ce oră arată ceasul?', options: ['13:23', '14:20', 'Fără 37 de minute ora 14'] },
    { src: 'photo/photo4.jpg', question: 'Câte puncte arată ora 8?', options: ['Două negre și două albe', 'Patru puncte distincte', 'Una neagră și trei albe'] },
    { src: 'photo/photo5.jpg', question: 'Ce culoare are peretele?', options: ['Alb imaculat', 'Negru profund', 'Gri elegant'] },
];

const PhotoQuiz: React.FC<{ onComplete: (answers: string[]) => void, name: string, surname: string }> = ({ onComplete, name, surname }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showPhoto, setShowPhoto] = useState(true);
    const [showResultsButton, setShowResultsButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPhoto(false);
        }, 1); 

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

    const handleSeeResults = () => {
        navigate('/results');
    };

    return (
        <div className="photo-quiz container">
            {showPhoto && currentIndex < photos.length && (
                <img
                    src={photos[currentIndex].src}
                    alt={`Description of photo ${currentIndex + 1}`}
                    className="photo-quiz-image img-fluid rounded mb-4"
                />
            )}
            {!showPhoto && currentIndex < photos.length && (
                <div>
                    <p>{photos[currentIndex].question}</p>
                    <p>Select an answer for the photo:</p>
                    <div className="list-group">
                        {photos[currentIndex].options.map((option) => (
                            <label key={option} className="list-group-item list-group-item-action">
                                <input
                                    type="radio"
                                    name={`photo-${currentIndex}`}
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={() => handleAnswerSelection(option)}
                                    className="me-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleNext}>Next</button>
                </div>
            )}
            {showResultsButton && (
                <button className="btn btn-success mt-4" onClick={handleSeeResults}>See Your Results</button>
            )}
        </div>
    );
};

export default PhotoQuiz;