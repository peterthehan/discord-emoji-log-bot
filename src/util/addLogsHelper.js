const LogBuilder = require('../classes/LogBuilder');
const { addLogs } = require('../repositories/logRepository');

module.exports = async (message, tokens, isReaction) => {
  const timestamp = new Date();
  const logs = tokens.map(token =>
    new LogBuilder()
      .setEmojiId(token.id)
      .setUserId(message.author.id)
      .setChannel(message.channel)
      .setIsReaction(isReaction)
      .setIsAnimated(
        Boolean(
          token.type === 'discordEmoji' &&
            message.channel.guild.emojis.resolve(token.id).animated
        )
      )
      .setTimestamp(timestamp)
      .build()
  );

  addLogs(logs);
};
