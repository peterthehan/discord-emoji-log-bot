const { GoogleSpreadsheet } = require('google-spreadsheet');
const { credentials, sheetId } = require('../config');

module.exports = async () => {
  const document = new GoogleSpreadsheet(sheetId);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();

  return document;
};
