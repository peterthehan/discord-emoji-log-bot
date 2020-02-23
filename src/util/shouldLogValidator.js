const { guildChannelMap } = require('../config');

module.exports = message => {
  if (message.author.bot) return false;

  const guildConfiguration = guildChannelMap[message.channel.guild.id];
  if (!guildConfiguration) return false;

  const { channelsToIgnore } = guildConfiguration;
  if (channelsToIgnore.includes(message.channel.id)) return false;

  return true;
};
