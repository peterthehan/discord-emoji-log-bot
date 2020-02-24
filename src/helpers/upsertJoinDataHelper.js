const { upsertJoinData } = require('../repositories/logRepository');
const serializer = require('../util/serializer');

const filterDuplicates = array => [...new Set(array)];

module.exports = async (message, tokens) => {
  const callbacks = [
    ...filterDuplicates(
      tokens
        .filter(token => token.type === 'discordEmoji')
        .map(token => {
          const emoji = message.channel.guild.emojis.resolve(token.id);
          return {
            title: 'emojis',
            joinData: {
              id: token.id,
              name: emoji.name,
              dateCreated: emoji.createdAt
            }
          };
        })
    ),
    {
      title: 'users',
      joinData: {
        id: message.author.id,
        name: message.author.tag,
        dateJoined: message.member.joinedAt
      }
    },
    {
      title: 'channels',
      joinData: {
        id: message.channel.id,
        name: message.channel.name
      }
    },
    {
      title: 'guilds',
      joinData: {
        id: message.channel.guild.id,
        name: message.channel.guild.name
      }
    }
  ].map(({ title, joinData }) => async () =>
    upsertJoinData({ title, joinData })
  );

  serializer(callbacks);
};
