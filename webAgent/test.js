
// test.js
// const WebSocket = require('ws');

// const socket = new WebSocket('wss://api.bland.ai/v1/conversation/7604be7b-33e2-4d1b-a37f-687ad80cd975?token=4cc56802-3053-4803-966b-a58ef4e1c75c');

// socket.on('open', () => {
//   console.log('✅ WebSocket connected successfully.');
// });

// socket.on('message', (data) => {
//   console.log('📨 Message from server:', data.toString());
// });

// socket.on('error', (err) => {
//   console.error('❌ WebSocket error:', err);
// });

// socket.on('close', (code, reason) => {
//   console.log(`❎ WebSocket closed. Code: ${code}, Reason: ${reason}`);
// });
const WebSocket = require('ws');

const ws = new WebSocket('wss://echo.websocket.org'); // Public test echo server

ws.on('open', () => {
  console.log('Connected to echo server');
  ws.send('Hello');
});

ws.on('message', (msg) => {
  console.log('Echo reply:', msg);
});
