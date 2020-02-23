const { name } = require('../../package');
const { initializeSheet } = require('../repositories/logRepository');
const logSchema = require('../schemas/logSchema');
const serializer = require('../util/serializer');

module.exports = async client => {
  console.log(`${name}|${client.user.tag}: Ready`);

  const callbacks = Object.keys(logSchema).map(title => async () =>
    initializeSheet(title, logSchema[title])
  );

  serializer(callbacks);
};
