module.exports = {
  token: ('TOKEN' in process.env ? process.env : require('../config')).TOKEN,
  owners: ['206161807491072000'],
  events: ['message', 'messageReactionAdd']
};
