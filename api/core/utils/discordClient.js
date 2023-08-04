const axios = require('axios');

const { DISCORD_BOT_TOKEN } = process.env;

module.exports = axios.create({
  baseURL: 'https://discord.com/api',
  headers: {
    'Content-Type': 'application/json',
    'accept-encoding': null,
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
  }
});
