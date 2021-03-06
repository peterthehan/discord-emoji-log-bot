const { GoogleSpreadsheet } = require("google-spreadsheet");
const { sheetId } = require("../config");

const documentCache = {};

module.exports = async (title) => {
  if (!(sheetId in documentCache)) {
    const document = new GoogleSpreadsheet(sheetId);
    await document.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    });
    await document.loadInfo();
    if (!document) {
      return {};
    }

    documentCache[sheetId] = document;
  }

  const document = documentCache[sheetId];
  const sheet = document.sheetsByIndex.find((sheet) => sheet.title === title);
  if (!sheet) {
    return { document };
  }

  return { document, sheet };
};
