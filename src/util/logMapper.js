module.exports = log => ({
  emojiId: `="${log.emojiId}"`,
  userId: `="${log.userId}"`,
  channelId: `="${log.channelId}"`,
  guildId: `="${log.guildId}"`,
  isReaction: log.isReaction,
  isAnimated: log.isAnimated,
  timestamp: log.timestamp
});
