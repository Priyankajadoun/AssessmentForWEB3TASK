const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Store active connections
const clients = new Set();

// Animation frame generator
function* animationGenerator() {
  const totalFrames = 300; // Total animation duration
  let frame = 0;

  while (true) {
    frame = (frame + 1) % totalFrames;
    
    // Calculate animation phase
    const phase = frame / totalFrames;
    
    // Different phases of animation
    let width = 0;
    let alpha = 1;
    
    if (phase < 0.2) { // Initial point phase
      width = 2;
      alpha = phase * 5;
    } else if (phase < 0.4) { // Growing line phase
      width = (phase - 0.2) * 50;
      alpha = 1;
    } else if (phase < 0.6) { // Thick line phase
      width = 10;
      alpha = 1;
    } else if (phase < 0.8) { // Shrinking line phase
      width = 10 - ((phase - 0.6) * 50);
      alpha = 1;
    } else { // Fade out phase
      width = 2;
      alpha = 1 - ((phase - 0.8) * 5);
    }

    yield {
      phase,
      width: Math.max(2, width),
      alpha,
      color: `hsl(${frame % 360}, 100%, 50%)`,
      timestamp: Date.now()
    };
  }
}

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  let animationInterval;
  const generator = animationGenerator();

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'START') {
      animationInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            type: 'ANIMATION_FRAME',
            data: generator.next().value
          }));
        }
      }, 1000 / 60); // 60 FPS
    }

    if (data.type === 'STOP') {
      clearInterval(animationInterval);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
    clearInterval(animationInterval);
  });

  // Send initial connection confirmation
  ws.send(JSON.stringify({ type: 'CONNECTED' }));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});