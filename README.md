# 🎉 Live Twitch Poll Viewer

This is a real-time web-based polling app that listens to chat messages from a Twitch channel and displays the results visually on a stylish, responsive webpage. It also includes simulation and reset tools, making it great for streamers to engage with their audience during livestreams.

> 💡 This is built to eventually support TikTok and other platforms for unified live voting!

---

## ✨ Features

- 🔴 Real-time vote tracking from Twitch chat  
- 📊 Responsive UI powered by Tailwind CSS  
- 🧠 Configurable poll options via `poll.json`  
- 🧪 Simulate votes locally  
- 🔄 Reset votes at any time  
- 🔐 Environment-based credential handling  

---

## 📁 Project Structure

```
.
├── public/
│   ├── index.html      # Frontend UI
│   └── poll.json       # Defines poll options
├── server.js           # Express + tmi.js server
├── config.js           # Loads .env credentials
├── .env                # Your Twitch creds (ignored by git)
├── package.json
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/live-twitch-poll.git
cd live-twitch-poll
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Add your Twitch bot credentials in a `.env` file at the root:

```env
TWITCH_USERNAME=your_twitch_bot_username
TWITCH_OAUTH=oauth:your_oauth_token
TWITCH_CHANNEL=your_channel_name
```

> 🔐 Your OAuth token should start with `oauth:` — get it from [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/)

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

Make sure the IDs here match what Twitch chat will vote on (e.g., by typing `1`, `2`, etc.).

---

## 🚀 Running the App

Start the server locally:

```bash
node server.js
```

Now open your browser and go to:

```
http://localhost:3000
```

You’ll see the poll interface, and any Twitch chat message saying `1`, `2`, etc. will increment the corresponding vote.

---

## 💬 How Voting Works

- Twitch viewers type `1`, `2`, etc. in chat.
- The bot watches chat and counts valid votes based on the `poll.json` file.
- Frontend updates in real time using WebSockets.

> Eventually, TikTok support will be added alongside Twitch!

---

## 🔁 Dev Tools

- **Simulate Vote:** Adds a random vote for testing  
- **Reset Poll:** Clears all vote counts and updates UI  

These buttons appear in the lower-right corner of the interface.

---

## 📦 Environment Variables Summary

| Key               | Description                         |
|------------------|-------------------------------------|
| `TWITCH_USERNAME` | Your bot's Twitch username          |
| `TWITCH_OAUTH`    | OAuth token (get from Twitch Apps)  |
| `TWITCH_CHANNEL`  | Channel to connect and listen to    |

> ⚠️ Be sure to include `.env` in your `.gitignore` to protect your credentials.

---

## ❤️ Credits & Tech

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [tmi.js](https://tmijs.com/)
- [Socket.IO](https://socket.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🧩 Future Plans

- 🟣 Add TikTok integration  
- 🧠 Live config switching via web UI  
- 🎨 Enhanced UI with progress bars and animations  
- 📺 OBS overlay support  

---

## 📄 License

MIT – feel free to fork and customize for your stream!