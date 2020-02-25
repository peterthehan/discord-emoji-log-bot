const { addLogs } = require('../repositories/logRepository');

module.exports = (message, tokens, isReaction) => {
  const sharedLog = {
    userId: message.author.id,
    channelId: message.channel.id,
    guildId: message.channel.guild.id,
    isReaction,
    timestamp: new Date()
  };
  const logs = tokens.map(token => ({ ...sharedLog, emojiId: token.id }));

  addLogs(logs);
};
