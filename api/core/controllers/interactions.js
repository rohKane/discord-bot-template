const { InteractionType, InteractionResponseType, InteractionResponseFlags, verifyKey } = require('discord-interactions');
const commands = require('../commands');

const { DISCORD_PUBLIC_KEY } = process.env;

async function validateRequest(req) {
  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];
  return verifyKey(req.rawBody, signature, timestamp, DISCORD_PUBLIC_KEY);
}

module.exports = (api) => {
  api.post('/', async (req, res) => {
    const isValidRequest = await validateRequest(req);
    if (!isValidRequest) {
      return res.status(401).send("Bad request signature");
    }
  
    const { type, data } = req.body;
  
    if (type === InteractionType.PING) {
      res.status(200).json({ type: InteractionResponseType.PONG });
      return;
    }
  
    if (type === InteractionType.APPLICATION_COMMAND) {
      if (!(data.name in commands)) {
        res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: 'Sorry that command is not available.',
            flags: InteractionResponseFlags.EPHEMERAL,
          },
        });
        return;
      }
  
      await commands[data.name].execute(req, res);
    }
  });
}