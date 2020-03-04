const emojiRegExp = require('emoji-regex')();

const tokenRegExps = {
  discordEmoji: /<a?:[a-zA-Z0-9_]+:(\d+)>/g,
  defaultEmoji: new RegExp(`(${emojiRegExp.source})`, 'g')
};

module.exports = (string, tokensToExtract = Object.keys(tokenRegExps)) => {
  const extractedTokens = [];
  for (const token of tokensToExtract) {
    let match;
    while ((match = tokenRegExps[token].exec(string))) {
      extractedTokens.push({ type: token, id: match[1], text: match[0] });
    }
  }

  return extractedTokens;
};
