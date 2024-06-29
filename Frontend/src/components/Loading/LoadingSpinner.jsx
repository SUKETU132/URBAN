// LoadingSpinner.js

import React, { useRef } from 'react';
import './LoadingSpinner.css'; // You can style the spinner using CSS
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const LoadingSpinner = () => {

    const spinnerRef = useRef(null);
    useGSAP(() => {
        gsap.fromTo(
            spinnerRef.current,
            { x: '100%' }, // Start position (off-screen to the right)
            { x: 0, duration: 0.3, ease: 'power2.out' } // End position (slide in from the right)
        );
    });

    return (
        <div className="loading-spinner" ref={spinnerRef}>
            <div className="spinner"></div>
            Loading...
        </div>
    );
};

export default LoadingSpinner;
