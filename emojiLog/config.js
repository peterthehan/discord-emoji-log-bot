module.exports = {
  ...('TOKEN' in process.env
    ? {
        sheetId: '1CrvJ3Zuec5F7dF5ez_nPOJ5auZVfPrXz_W8GG2o0PZM',
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY
        }
      }
    : {
        sheetId: '1C0G4ijmfF7StZkCgpiv3paOraIh9k9h7GmjVVZUrZNM',
        credentials: require('../../../credentials')
      }),
  guildChannelMap: {
    '258167954913361930': {
      channelsToIgnore: []
    }
  }
};
