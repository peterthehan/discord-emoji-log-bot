module.exports = (message, token) =>
  token.type === 'defaultEmoji' || message.guild.emojis.resolve(token.id);
