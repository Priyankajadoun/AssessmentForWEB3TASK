import { useState, useEffect, useCallback } from 'react';

const WS_URL = 'ws://localhost:8080';

export const useWebSocket = () => {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const connect = useCallback(() => {
    const websocket = new WebSocket(WS_URL);

    websocket.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    websocket.onclose = () => {
      setIsConnected(false);
      // Attempt to reconnect after 3 seconds
      setTimeout(connect, 3000);
    };

    websocket.onerror = (error) => {
      setError('WebSocket error occurred');
      console.error('WebSocket error:', error);
    };

    setWs(websocket);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }, [ws]);

  return { ws, isConnected, error, sendMessage };
};