const isProduction = 'TOKEN' in process.env;

module.exports = {
  ...(isProduction
    ? {
        token: process.env.TOKEN,
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY
        }
      }
    : {
        token: require('../config').TOKEN,
        credentials: require('../credentials')
      }),
  events: ['message', 'messageReactionAdd'],
  sheetId: isProduction
    ? '1CrvJ3Zuec5F7dF5ez_nPOJ5auZVfPrXz_W8GG2o0PZM'
    : '1C0G4ijmfF7StZkCgpiv3paOraIh9k9h7GmjVVZUrZNM',
  guildChannelMap: {
    '258167954913361930': {
      channelsToIgnore: []
    }
  }
};
