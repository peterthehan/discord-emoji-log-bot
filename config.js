const isProduction = 'TOKEN' in process.env;

module.exports = {
  credentials: isProduction
    ? {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY
      }
    : require('../../../credentials'),
  sheetId: isProduction
    ? '1CrvJ3Zuec5F7dF5ez_nPOJ5auZVfPrXz_W8GG2o0PZM'
    : '1C0G4ijmfF7StZkCgpiv3paOraIh9k9h7GmjVVZUrZNM',
  guildChannelMap: {
    '258167954913361930': {
      channelsToIgnore: []
    }
  }
};
