const addLogsHelper = require('../util/addLogsHelper');
const shouldLogValidator = require('../util/shouldLogValidator');
const upsertJoinDataHelper = require('../util/upsertJoinDataHelper');

const makeMessage = (messageReaction, user) => ({
  author: user,
  channel: messageReaction.message.channel
});

module.exports = async (messageReaction, user) => {
  const message = makeMessage(messageReaction, user);
  if (!shouldLogValidator(message)) return;

  const tokens = [
    messageReaction.emoji.id
      ? { type: 'discordEmoji', id: messageReaction.emoji.id }
      : { type: 'defaultEmoji', id: messageReaction.emoji.name }
  ].filter(
    token =>
      token.type === 'defaultEmoji' ||
      messageReaction.message.guild.emojis.resolve(token.id)
  );
  if (!tokens.length) return;

  addLogsHelper(message, tokens, true);
  upsertJoinDataHelper(message, tokens);
};
