module.exports = (message, token) =>
  token.type === 'defaultEmoji' ||
  message.channel.guild.emojis.resolve(token.id);
