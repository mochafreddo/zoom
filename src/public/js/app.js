const socket = new WebSocket(`ws://${window.location.host}`);

// Connection event handlers
socket.addEventListener('open', () => {
  console.log('Connected to Server ✅');
});

socket.addEventListener('close', () => {
  console.log('Disconnected from Server ❌');
});

// Message handling
socket.addEventListener('message', (message) => {
  console.log('New message: ', message.data);
});

// Test message
setTimeout(() => {
  socket.send('hello from the browser!');
}, 10000);
