module.exports = ({ emojiId, userId, channelId, guildId, ...props }) => ({
  emojiId: `="${emojiId}"`,
  userId: `="${userId}"`,
  channelId: `="${channelId}"`,
  guildId: `="${guildId}"`,
  ...props
});
