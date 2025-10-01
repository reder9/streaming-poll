# 🎉 Prize Wheel for TikTok Live

A live **Prize Wheel** web app for TikTok live streams where viewers can enter by typing `!ticket` in chat. The wheel dynamically updates as users enter and allows you to spin for a completely random winner. Includes a confetti celebration and glowing winner animation!

---

## Features

* **Live-updating wheel** – users are added in real time as they enter `!ticket`.
* **Randomized winner selection** – fully fair and unbiased.
* **Confetti and animations** – winner text glows and pulses, and confetti celebrates the winner.
* **Simulation buttons** – test with random entries or reset the wheel.
* **Clean, modern UI** – styled with TailwindCSS, mobile-friendly.
* **Customizable colors and styling** – easy to tweak for branding.

---

## How to Use

1. **Run the server**
   Make sure you have `Node.js` installed. Then install dependencies and start the server:

   ```bash
   npm install
   node server.js
   ```

2. **Open the Prize Wheel page**
   Visit `http://localhost:3000/` (or the port your server is running on) to see the wheel.

3. **Enter the prize wheel**

   * Viewers type `!ticket` in your TikTok live chat.
   * For testing, click **Simulate Ticket Entry** to add a random user.

4. **Spin the wheel**

   * Click the **SPIN** button.
   * The wheel animates and randomly selects a winner.
   * Confetti and glowing text celebrate the winner.

5. **Manage entries**

   * **Reset Wheel** – clears all entries.
   * **Add Entry (Simulation)** – adds a random test username.

---

## Installation

Clone the repo:

```bash
git clone https://github.com/reder9/tiktok-prize-picker.git
cd tiktok-prize-picker
npm install
node server.js
```

Dependencies:

* [Node.js](https://nodejs.org/)
* [Express](https://www.npmjs.com/package/express)
* [Socket.IO](https://socket.io/)
* [TailwindCSS](https://tailwindcss.com/)
* [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## File Structure

```
prize-wheel/
│
├─ public/
│  ├─ index.html         # Prize Wheel page
│  └─ confetti.png       # Optional confetti image (if used)
│
├─ server.js             # Node.js + Socket.IO server
├─ package.json
└─ README.md
```

---

## Customization

* **Colors:** Modify the `colors` array in `index.html` to change wheel segment colors.
* **Wheel size:** Adjust the `<canvas>` width and height.
* **Animation:** Tweak duration, spins, and easing in the `animateToIndex` function.

---

## License

MIT License – free to use and modify.
