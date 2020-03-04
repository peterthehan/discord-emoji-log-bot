const addLogsHelper = require('../helpers/addLogsHelper');
const upsertJoinDataHelper = require('../helpers/upsertJoinDataHelper');
const getTokens = require('../util/getTokens');
const isLoggable = require('../util/isLoggable');
const isValidEmoji = require('../util/isValidEmoji');

module.exports = async message => {
  if (!isLoggable(message)) return;

  const tokens = getTokens(message.content).filter(token =>
    isValidEmoji(message, token)
  );
  if (!tokens.length) return;

  addLogsHelper(message, tokens, false);
  upsertJoinDataHelper(message, tokens);
};
