const addLogsHelper = require('../util/addLogsHelper');
const getTokens = require('../util/getTokens');
const shouldLogValidator = require('../util/shouldLogValidator');
const upsertJoinDataHelper = require('../util/upsertJoinDataHelper');

module.exports = async message => {
  if (!shouldLogValidator(message)) return;

  const tokens = getTokens(message.content).filter(
    token =>
      token.type === 'defaultEmoji' || message.guild.emojis.resolve(token.id)
  );
  if (!tokens.length) return;

  addLogsHelper(message, tokens, false);
  upsertJoinDataHelper(message, tokens);
};
