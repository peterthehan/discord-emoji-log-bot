const { upsertJoinData } = require('../repositories/logRepository');
const serializer = require('../util/serializer');

const filterDuplicates = array => [...new Set(array)];

module.exports = (message, tokens) => {
  const emojiIds = filterDuplicates(
    tokens.filter(token => token.type === 'discordEmoji').map(token => token.id)
  );

  const callbacks = [
    ...emojiIds.map(emojiId => {
      const emoji = message.channel.guild.emojis.resolve(emojiId);
      return { title: 'emojis', joinData: { id: emojiId, name: emoji.name } };
    }),
    {
      title: 'users',
      joinData: { id: message.author.id, name: message.author.tag }
    },
    {
      title: 'channels',
      joinData: { id: message.channel.id, name: message.channel.name }
    },
    {
      title: 'guilds',
      joinData: {
        id: message.channel.guild.id,
        name: message.channel.guild.name
      }
    }
  ].map(joinData => async () => upsertJoinData(joinData));

  serializer(callbacks);
};
