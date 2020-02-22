module.exports = {
  token: ('TOKEN' in process.env ? process.env : require('../config')).TOKEN,
  credentials:
    'CLIENT_EMAIL' in process.env && 'PRIVATE_KEY' in process.env
      ? {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY
        }
      : require('../credentials'),
  sheetId: '1CrvJ3Zuec5F7dF5ez_nPOJ5auZVfPrXz_W8GG2o0PZM',
  owners: ['206161807491072000'],
  events: ['message', 'messageReactionAdd']
};
