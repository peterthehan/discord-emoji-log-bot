const getDocumentAndSheet = require('../util/getDocumentAndSheet');
const joinDataMapper = require('../util/joinDataMapper');
const logMapper = require('../util/logMapper');

const addJoinData = async (sheet, joinData) => {
  sheet.addRow(joinData);
};

const updateJoinData = async (row, joinData) => {
  if (row.name === joinData.name) return;

  row.name = joinData.name;
  row.save();
};

module.exports = {
  initializeSheet: async (title, headers) => {
    const { document, sheet } = await getDocumentAndSheet(title);
    if (!document || sheet) return;

    const newSheet = await document.addSheet({ title });
    newSheet.setHeaderRow(headers);
  },
  addLogs: async logs => {
    const { sheet } = await getDocumentAndSheet('logs');
    if (!sheet) return;

    sheet.addRows(logs.map(logMapper));
  },
  upsertJoinData: async ({ title, joinData }) => {
    const { sheet } = await getDocumentAndSheet(title);
    if (!sheet) return;

    const rows = await sheet.getRows();
    const row = rows.find(row => row.id === joinData.id);
    if (!row) {
      addJoinData(sheet, joinDataMapper(joinData));
    } else {
      updateJoinData(row, joinData);
    }
  }
};
