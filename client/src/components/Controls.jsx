import React from 'react';

export const Controls = ({ isConnected, onStart, onStop }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <button
        onClick={onStart}
        disabled={!isConnected}
        style={{
          marginRight: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isConnected ? 'pointer' : 'not-allowed'
        }}
      >
        Start Animation
      </button>
      <button
        onClick={onStop}
        disabled={!isConnected}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isConnected ? 'pointer' : 'not-allowed'
        }}
      >
        Stop Animation
      </button>
    </div>
  );
}; 