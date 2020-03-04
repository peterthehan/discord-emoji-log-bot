const addLogsHelper = require('../helpers/addLogsHelper');
const upsertJoinDataHelper = require('../helpers/upsertJoinDataHelper');
const isLoggable = require('../util/isLoggable');
const isValidEmoji = require('../util/isValidEmoji');

module.exports = async (messageReaction, user) => {
  const message = { author: user, channel: messageReaction.message.channel };
  if (!isLoggable(message)) return;

  const tokens = [
    messageReaction.emoji.id
      ? { type: 'discordEmoji', id: messageReaction.emoji.id }
      : { type: 'defaultEmoji', id: messageReaction.emoji.name }
  ].filter(token => isValidEmoji(message, token));
  if (!tokens.length) return;

  addLogsHelper(message, tokens, true);
  upsertJoinDataHelper(message, tokens);
};
