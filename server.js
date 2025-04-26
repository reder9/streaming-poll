const tmi = require('tmi.js');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const { WebcastPushConnection } = require('tiktok-live-connector');

// Express setup
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// Load poll options from poll.json
let pollResults = {};
const pollPath = path.join(__dirname, 'public', 'poll.json');
try {
  const pollData = JSON.parse(fs.readFileSync(pollPath, 'utf8'));
  if (pollData?.options?.length) {
    pollData.options.forEach((opt, index) => {
      pollResults[`option${index + 1}`] = 0;
    });
    console.log(`✅ Loaded ${pollData.options.length} poll options from poll.json`);
  } else {
    throw new Error('No options found in poll.json');
  }
} catch (err) {
  console.error('❌ Failed to load poll.json:', err);
  process.exit(1);
}

// Twitch Chat Setup
const twitchClient = new tmi.Client({
  options: { debug: true },
  identity: {
    username: config.twitch.username,
    password: config.twitch.password
  },
  channels: config.twitch.channels
});

twitchClient.connect();

twitchClient.on('message', (channel, tags, message, self) => {
  if (self) return;
  const msg = message.trim().toLowerCase();
  console.log(`🟣 Twitch - ${tags['display-name'] || tags['username']}: ${msg}`);
  handleVote(msg);
});

// TikTok Chat Setup
if (config.tiktok.username) {
  const tiktokConnection = new WebcastPushConnection(config.tiktok.username);

  tiktokConnection.connect()
    .then(state => {
      console.log(`✅ Connected to TikTok live chat of ${state.uniqueId}`);
    })
    .catch(err => {
      console.error('❌ TikTok connection failed:', err);
    });

  tiktokConnection.on('chat', data => {
    const msg = data.comment.trim().toLowerCase();
    console.log(`📱 TikTok - ${data.uniqueId}: ${msg}`);
    handleVote(msg);
  });
} else {
  console.warn('⚠️ TikTok username not set in config.js');
}

// Vote Handling
function handleVote(msg) {
  const number = parseInt(msg.match(/\b\d+\b/)?.[0]); // Extract number from message
  const optionKey = `option${number}`;

  if (number && pollResults.hasOwnProperty(optionKey)) {
    pollResults[optionKey]++;
    io.emit('updatePoll', pollResults);
  } else {
    console.log(`❌ Invalid vote ignored: "${msg}"`);
  }
}

// Socket.io
io.on('connection', (socket) => {
  socket.emit('updatePoll', pollResults);

  socket.on('resetPoll', () => {
    for (let key in pollResults) {
      pollResults[key] = 0;
    }
    io.emit('updatePoll', pollResults);
  });
});

server.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
