import React, { useState } from 'react';
import './AnimatedLoader.css';

const AnimatedLoader = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  return (
    <div className="loader-container">
      <div className={`loader ${isAnimating ? 'animate' : ''}`}></div>
      <div className="controls">
        <button onClick={startAnimation}>Start</button>
        <button onClick={stopAnimation}>Stop</button>
      </div>
    </div>
  );
};

export default AnimatedLoader; 