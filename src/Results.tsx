import React, { useEffect, useState } from 'react';

const Results: React.FC<{ name: string, surname: string }> = ({ name, surname }) => {
    const [results, setResults] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('https://question-site.onrender.com/get-answers', {
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

        fetchResults();
    }, [name, surname]);

    return (
        <div className="results container mt-4">
            <h2>Your Results</h2>
            {results ? <pre>{results}</pre> : <p>Loading...</p>}
        </div>
    );
};

export default Results;