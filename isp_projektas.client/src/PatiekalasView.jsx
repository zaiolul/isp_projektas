import React, { useState, useEffect } from 'react';

const PatiekalasView = () => {
    const [patiekalai, setPatiekalai] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5031/patiekalas');
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPatiekalai(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    return (
        <div>
            <ul>
                {patiekalai.map((patiekalas) => (
                    <li key={patiekalas.patiekalasID}>
                        {patiekalas.pavadinimas}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatiekalasView;