const logSchema = require('../schemas/logSchema');
const getDocument = require('../util/getDocument');
const joinDataMapper = require('../util/joinDataMapper');
const logMapper = require('../util/logMapper');

const findSheet = (document, title) =>
  document.sheetsByIndex.find(sheet => sheet.title === title);

module.exports = {
  initializeDocument: async () => {
    const document = await getDocument();

    Object.keys(logSchema)
      .filter(title => !findSheet(document, title))
      .forEach(async title => {
        const headers = logSchema[title];
        const newSheet = await document.addSheet({ title });
        newSheet.setHeaderRow(headers);
      });
  },
  addLogs: async logs => {
    const document = await getDocument();
    const sheet = findSheet(document, 'logs');

    sheet.addRows(logs.map(logMapper));
  },
  upsertJoinData: async joinData => {
    const document = await getDocument();
    if (!document) return;

    const sheet = findSheet(document, Object.keys(joinData)[0]);
    if (!sheet) return;

    const rows = await sheet.getRows();

    console.log(rows);
    Object.values(joinData)[0].forEach(async data => {
      const row = rows.find(row => row.id === data.id);
      if (!row) {
        await sheet.addRow(joinDataMapper(data));
        return;
      }

      if (row.name === data.name) return;

      row.name = data.name;
      await row.save();
    });
  }
};
