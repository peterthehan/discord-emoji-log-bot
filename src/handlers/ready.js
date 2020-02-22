const { name } = require('../../package');
const { initializeDocument } = require('../repositories/logRepository');

module.exports = async client => {
  console.log(`${name}|${client.user.tag}: Ready`);

  await initializeDocument();
};
