import React, { useEffect, useState } from 'react';
import './Loading.css';

const LoadingDots = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + '.' : ''));
        }, 100); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-dots">
            Loading  {dots}
        </div>
    );
};

export default LoadingDots;
