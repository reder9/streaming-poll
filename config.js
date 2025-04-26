require('dotenv').config();

module.exports = {
  twitch: {
    username: process.env.TWITCH_USERNAME,
    password: process.env.TWITCH_OAUTH,
    channels: [process.env.TWITCH_CHANNEL]
  },
  tiktok: {
    username: 'screamin_goatgal'
  }
};
