// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { WebcastPushConnection } = require('tiktok-live-connector');
const { randomInt } = require('crypto');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static('public'));

// Ticket storage (unique usernames, insertion order preserved)
let ticketEntries = new Set();

// TikTok username (set via env var or change here)
const tiktokUsername = process.env.TIKTOK_USERNAME || 'your_tiktok_username';
let tiktokConnection;

if (tiktokUsername && tiktokUsername !== 'your_tiktok_username') {
  try {
    tiktokConnection = new WebcastPushConnection(tiktokUsername);

    tiktokConnection.connect()
      .then(state => {
        console.log(`✅ Connected to TikTok live chat of ${state.uniqueId} (roomId: ${state.roomId || 'n/a'})`);
      })
      .catch(err => {
        console.warn('⚠️ TikTok connection failed (maybe stream is not live). Continuing without crashing.', err);
      });

    tiktokConnection.on('chat', data => {
      try {
        if (!data || !data.comment) return;
        const msg = data.comment.trim().toLowerCase();
        if (msg === '!ticket') {
          const username = data.uniqueId || (data.user && data.user.uniqueId) || `user_${Math.floor(Math.random()*100000)}`;
          if (!ticketEntries.has(username)) {
            ticketEntries.add(username);
            console.log(`🎟️ ${username} entered the giveaway (total ${ticketEntries.size})`);
            io.emit('updateTickets', Array.from(ticketEntries));
          } else {
            console.log(`⚠️ Duplicate ticket ignored for ${username}`);
          }
        }
      } catch (err) {
        console.error('Error handling TikTok chat event:', err);
      }
    });

    tiktokConnection.on('disconnected', () => {
      console.warn('⚠️ Disconnected from TikTok live.');
    });
  } catch (err) {
    console.warn('⚠️ Error initializing TikTok connection:', err);
  }
} else {
  console.warn('⚠️ No TikTok username set. Set TIKTOK_USERNAME env var or edit tiktokUsername. Debugging still works.');
}

// Socket.IO handlers
io.on('connection', (socket) => {
  console.log('⚡ Client connected:', socket.id);

  // send current entries
  socket.emit('updateTickets', Array.from(ticketEntries));

  // debug: simulate adding a ticket
  socket.on('simulateTicket', (username) => {
    if (typeof username !== 'string' || !username.trim()) return;
    if (!ticketEntries.has(username)) {
      ticketEntries.add(username);
      io.emit('updateTickets', Array.from(ticketEntries));
      console.log('🐞 Simulated ticket added:', username);
    } else {
      console.log('🐞 Simulated duplicate ignored:', username);
    }
  });

  // reset tickets
  socket.on('resetTickets', () => {
    ticketEntries.clear();
    io.emit('updateTickets', []);
    console.log('♻️ Tickets reset by client');
  });

  // NEW: requestSpin -> server picks a winner (cryptographically) and sends the result (index + snapshot entries)
  socket.on('requestSpin', () => {
    const entries = Array.from(ticketEntries);
    if (entries.length === 0) {
      socket.emit('spinResult', { index: null, winner: null, entries: [] });
      return;
    }

    // Use crypto.randomInt for fair randomness
    const idx = randomInt(entries.length); // returns integer in [0, entries.length)
    const winner = entries[idx];

    console.log(`🔀 Spin requested -> index: ${idx}, winner: ${winner}`);
    // Emit to all clients so everyone animates to the same result/entries snapshot
    io.emit('spinResult', { index: idx, winner, entries });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('💡 To enable debug mode (adds simulate ticket button), open:');
  console.log(`   http://localhost:${PORT}/?debug=true`);
});

