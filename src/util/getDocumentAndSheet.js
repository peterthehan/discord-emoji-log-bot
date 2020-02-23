const { GoogleSpreadsheet } = require('google-spreadsheet');
const { credentials, sheetId } = require('../config');

module.exports = async title => {
  const document = new GoogleSpreadsheet(sheetId);
  await document.useServiceAccountAuth(credentials);
  await document.loadInfo();
  if (!document) return {};

  const sheet = document.sheetsByIndex.find(sheet => sheet.title === title);
  if (!sheet) return { document };

  return { document, sheet };
};
