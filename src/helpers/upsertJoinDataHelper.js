const { upsertJoinData } = require('../repositories/logRepository');
const serializer = require('../util/serializer');

const getUniqueEmojiIds = (tokens, type) => [
  ...new Set(tokens.filter(token => token.type === type).map(token => token.id))
];

module.exports = (message, tokens) => {
  const callbacks = [
    ...getUniqueEmojiIds(tokens, 'discordEmoji').map(emojiId => {
      const emoji = message.channel.guild.emojis.resolve(emojiId);
      return {
        title: 'emojis',
        joinData: { id: emojiId, name: emoji.name, isAnimated: emoji.animated }
      };
    }),
    ...getUniqueEmojiIds(tokens, 'defaultEmoji').map(emojiId => ({
      title: 'emojis',
      joinData: { id: emojiId, name: emojiId, isAnimated: false }
    })),
    {
      title: 'users',
      joinData: { id: message.author.id, name: message.author.tag }
    },
    {
      title: 'channels',
      joinData: {
        id: message.channel.id,
        name: message.channel.name,
        guildId: message.channel.guild.id
      }
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
