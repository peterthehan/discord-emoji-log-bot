const JoinDataBuilder = require('../classes/JoinDataBuilder');
const LogBuilder = require('../classes/LogBuilder');
const { addLogs, upsertJoinData } = require('../repositories/logRepository');
const filterDuplicates = require('../util/filterDuplicates');
const getTokens = require('../util/getTokens');

module.exports = async message => {
  if (message.author.bot) return;
  if (message.author.id !== '206161807491072000') return;

  const tokens = getTokens(message.content, ['discordEmoji', 'defaultEmoji']);
  if (!tokens.length) return;

  const emojiLogs = tokens.map(token =>
    new LogBuilder()
      .setEmojiId(token.id)
      .setUserId(message.author.id)
      .setChannelId(message.channel.id)
      .setGuildId(message.guild.id)
      .isMessageEmoji()
      .setIsAnimated(
        token.type === 'discordEmoji' &&
          message.guild.emojis.resolve(token.id).animated
      )
      .setTimestamp(message.createdAt)
      .build()
  );
  await addLogs(emojiLogs);

  const emojis = filterDuplicates(
    tokens.filter(token => token.type === 'discordEmoji').map(token => token.id)
  ).map(tokenId =>
    new JoinDataBuilder()
      .setId(tokenId)
      .setName(message.guild.emojis.resolve(tokenId).name)
      .build()
  );

  const user = [
    new JoinDataBuilder()
      .setId(message.author.id)
      .setName(message.author.tag)
      .build()
  ];

  const channel = [
    new JoinDataBuilder()
      .setId(message.channel.id)
      .setName(message.channel.name)
      .build()
  ];

  const guild = [
    new JoinDataBuilder()
      .setId(message.guild.id)
      .setName(message.guild.name)
      .build()
  ];

  [
    { emojis },
    { users: user },
    { channels: channel },
    { guilds: guild }
  ].forEach(upsertJoinData);
};
