import React, { useEffect, useRef } from 'react';

export const AnimationCanvas = ({ frame }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!frame || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set line properties
    ctx.lineCap = 'round';
    ctx.lineWidth = frame.width;
    ctx.strokeStyle = frame.color;
    ctx.globalAlpha = frame.alpha;
    
    // Calculate line position
    const centerY = canvas.height / 2;
    const startX = canvas.width / 2 - 100;
    const endX = canvas.width / 2 + 100;
    
    // Draw the line
    ctx.beginPath();
    ctx.moveTo(startX, centerY);
    ctx.lineTo(endX, centerY);
    ctx.stroke();
    
    // Draw end points
    if (frame.width <= 2) {
      ctx.beginPath();
      ctx.arc(canvas.width/2, centerY, 4, 0, 2 * Math.PI);
      ctx.fillStyle = frame.color;
      ctx.fill();
    }
    
    // Reset global alpha
    ctx.globalAlpha = 1;
  }, [frame]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: '#000' // Dark background to make the animation more visible
      }}
    />
  );
}; 