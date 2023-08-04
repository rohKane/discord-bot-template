const discordClient = require('../utils/discordClient');

const { APPLICATION_ID, TEST_GUILD_ID } = process.env;

module.exports = (api) => {
  api.get('/', async (req, res) => {
    const isGlobal = req.query.global === 'true';
    const endpoint = isGlobal
      ? `/applications/${APPLICATION_ID}/commands`
      : `/applications/${APPLICATION_ID}/guilds/${TEST_GUILD_ID}/commands`;

    const { data: commands } = await discordClient.get(endpoint);

    res.status(200).json(commands);
  });
};
