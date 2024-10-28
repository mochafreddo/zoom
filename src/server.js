import express from 'express';
import http from 'http';
import WebSocket from 'ws';

// Server initialization
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];

// Express configuration
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

// Routes
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

// WebSocket handling
wss.on('connection', (socket) => {
  sockets.push(socket);
  socket['nickname'] = 'Anon';
  console.log('Connected to Browser ✅');

  socket.on('close', () => {
    // Remove disconnected socket from array
    const index = sockets.indexOf(socket);
    if (index > -1) sockets.splice(index, 1);
    console.log('Disconnected from the Browser ❌');
  });

  socket.on('message', (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case 'new_message':
        sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
        break;
      case 'nickname':
        socket['nickname'] = message.payload;
        break;
    }
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
