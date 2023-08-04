const { InteractionResponseType, InteractionResponseFlags } = require('discord-interactions');

module.exports = {
  async execute(req, res) {
    res.status(200).json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `You're <@${req.body.member.user.id}>.`,
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    })
  },

  object: {
    name: "user",
    type: 1,
    description: "Send a mention to you",
  }
};
