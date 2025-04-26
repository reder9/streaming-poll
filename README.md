# 🎉 Live Poll Viewer (Twitch + TikTok Ready)

This is a real-time web-based polling app that listens to chat messages from Twitch **and** TikTok channels and displays the results visually on a stylish, responsive webpage. It also includes simulation and reset tools, making it great for streamers to engage with their audience during livestreams.

> 💡 Already supports TikTok and Twitch out of the box!

---

## ✨ Features

- 🔴 Real-time vote tracking from **Twitch** and **TikTok**
- 📊 Responsive UI powered by Tailwind CSS and GSAP animations
- 🧠 Configurable poll options via `poll.json`
- 🧪 Simulate votes locally
- 🔄 Reset votes at any time (with wipe and confetti animations)
- 🔐 Environment-based credential handling

---

## 📁 Project Structure

```
.
├── public/
│   ├── index.html      # Frontend UI
│   ├── poll.json       # Defines poll options
│   └── confetti.png    # Confetti effect image
├── server.js           # Express + chat integration
├── config.js           # Loads .env credentials
├── .env                # Your Twitch/TikTok creds (ignored by git)
├── package.json
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/live-poll-viewer.git
cd live-poll-viewer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Add your Twitch/TikTok bot credentials in a `.env` file at the root:

```env
TWITCH_USERNAME=your_twitch_bot_username
TWITCH_OAUTH=oauth:your_oauth_token
TWITCH_CHANNEL=your_channel_name

TIKTOK_USERNAME=your_tiktok_bot_username
TIKTOK_SESSION_ID=your_session_id
```

> 🔐 Get your Twitch OAuth token at [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/)

### 4. Create a `poll.json` file in the `public` folder

Example structure:

```json
{
  "options": [
    { "id": "option1", "label": "Pizza", "description": "Cheesy goodness" },
    { "id": "option2", "label": "Tacos", "description": "Crunch or soft?" }
  ]
}
```

IDs should match what chat users will type (`1`, `2`, etc.).

---

## 🚀 Running the App

Start the server locally:

```bash
node server.js
```

Open your browser to:

```
http://localhost:3000
```

Votes from both Twitch and TikTok chats will appear in real-time.

---

## 💬 How Voting Works

- Viewers type `1`, `2`, etc. in Twitch or TikTok chat.
- The bot counts votes and updates the UI live using WebSockets.

---

## 🔁 Dev Tools

- **Simulate Vote:** Adds a random vote for testing
- **Reset Poll:** Clears all votes and triggers a page wipe

---

## 📦 Environment Variables Summary

| Key                 | Description                          |
|---------------------|--------------------------------------|
| `TWITCH_USERNAME`   | Your Twitch bot username             |
| `TWITCH_OAUTH`      | OAuth token for Twitch               |
| `TWITCH_CHANNEL`    | Twitch channel to listen to          |
| `TIKTOK_USERNAME`   | Your TikTok username or bot name     |
| `TIKTOK_SESSION_ID` | Your TikTok session (cookie string)  |

> ⚠️ Be sure to `.gitignore` your `.env` file.

---

## ❤️ Credits & Tech

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [tmi.js](https://tmijs.com/) – Twitch chat
- [Socket.IO](https://socket.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/) – animations

---

## 🧩 Future Plans

- 📡 Better mobile TikTok support
- 🧠 Live config editor (in browser)
- 🖼️ Stream overlays and custom themes

---

## 📄 License

MIT – Fork it, improve it, use it on your stream! 🎉