const { addLogs } = require('../repositories/logRepository');

module.exports = async (message, tokens, isReaction) => {
  const sharedLog = {
    userId: message.author.id,
    channelId: message.channel.id,
    guildId: message.channel.guild.id,
    isReaction,
    timestamp: new Date()
  };
  const logs = tokens.map(token => ({
    ...sharedLog,
    emojiId: token.id,
    isAnimated:
      token.type === 'discordEmoji' &&
      message.channel.guild.emojis.resolve(token.id).animated
  }));

  addLogs(logs);
};
