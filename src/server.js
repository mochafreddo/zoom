import express from 'express';
import http from 'http';
import WebSocket from 'ws';

// Express initialization
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Express configuration
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

// Routes
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

// WebSocket handling
wss.on('connection', (socket) => {
  console.log('Connected to Browser ✅');

  socket.send('hello!!!');

  socket.on('message', (message) => {
    console.log(message);
  });

  socket.on('close', () => {
    console.log('Disconnected from the Browser ❌');
  });
});

// Server initialization
const handleListen = () => console.log(`Listening on http://localhost:3000`);
server.listen(3000, handleListen);
