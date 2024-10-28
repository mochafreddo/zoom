// DOM Elements
const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');

// Helper Functions
const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

// Form Event Handlers
const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  input.value = '';
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
};

// WebSocket Setup
const socket = new WebSocket(`ws://${window.location.host}`);

// WebSocket Event Handlers
socket.addEventListener('open', () => {
  console.log('Connected to Server ✅');
});

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener('close', () => {
  console.log('Disconnected from Server ❌');
});

// Event Listeners
messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);
