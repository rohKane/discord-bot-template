const discordClient = require('../utils/discordClient');
const commands = require('../commands');

const { APPLICATION_ID, TEST_GUILD_ID } = process.env;

module.exports = (api) => {
  api.get('/', async (req, res) => {
    const isGlobal = req.query.global === 'true';

    const endpoint = isGlobal
      ? `/applications/${APPLICATION_ID}/commands`
      : `/applications/${APPLICATION_ID}/guilds/${TEST_GUILD_ID}/commands`;

    const commandsObjects = [];

    for (const command in commands) {
      commandsObjects.push(commands[command].object);
    }

    const { data: newCommands } = await discordClient.put(endpoint, commandsObjects);

    res.status(200).json(newCommands);
  });
};
