const { InteractionResponseType, InteractionResponseFlags } = require('discord-interactions');
const discordClient = require('../utils/discordClient');

module.exports = {
  async execute(req, res) {
    const { channel_id, guild_id } = req.body;

    try {
      const [
        { data: guild },
        { data: channel },
      ] = await Promise.all([
        discordClient.get(`/guilds/${guild_id}`),
        discordClient.get(`/channels/${channel_id}`),
      ]);

      res.status(200).json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `You're on channel "${channel.name}" of "${guild.name}"`,
          flags: InteractionResponseFlags.EPHEMERAL,
        },
      })
    } catch (error) {
      console.log(error)
    }
  },

  object: {
    name: "server",
    type: 1,
    description: "Send the channel and server you are in",
  }
}
