const { addLogs } = require('../repositories/logRepository');

module.exports = (message, tokens, isReaction) => {
  const sharedLog = {
    userId: message.author.id,
    channelId: message.channel.id,
    isReaction,
    timestamp: new Date()
  };
  const logs = tokens.map(token => ({ emojiId: token.id, ...sharedLog }));

  addLogs(logs);
};
