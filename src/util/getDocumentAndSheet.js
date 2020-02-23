const { GoogleSpreadsheet } = require('google-spreadsheet');
const { credentials, sheetId } = require('../config');

const documentCache = {};

module.exports = async title => {
  if (!(sheetId in documentCache)) {
    const document = new GoogleSpreadsheet(sheetId);
    await document.useServiceAccountAuth(credentials);
    await document.loadInfo();
    if (!document) return {};

    documentCache[sheetId] = document;
  }

  const document = documentCache[sheetId];
  const sheet = document.sheetsByIndex.find(sheet => sheet.title === title);
  if (!sheet) return { document };

  return { document, sheet };
};
