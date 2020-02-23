const JoinDataBuilder = require('../classes/JoinDataBuilder');
const { upsertJoinData } = require('../repositories/logRepository');
const serializer = require('../util/serializer');

const filterDuplicates = array => [...new Set(array)];

const makeJoinData = (title, id, name) => ({ title, id, name });

module.exports = async (message, tokens) => {
  const callbacks = [
    ...filterDuplicates(
      tokens
        .filter(token => token.type === 'discordEmoji')
        .map(token =>
          makeJoinData(
            'emojis',
            token.id,
            message.channel.guild.emojis.resolve(token.id).name
          )
        )
    ),
    makeJoinData('users', message.author.id, message.author.tag),
    makeJoinData('channels', message.channel.id, message.channel.name),
    makeJoinData('guilds', message.channel.guild.id, message.channel.guild.name)
  ].map(({ title, id, name }) => async () =>
    upsertJoinData({
      title,
      joinData: new JoinDataBuilder().setJoinData({ id, name }).build()
    })
  );

  serializer(callbacks);
};
