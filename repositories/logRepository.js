const getDocumentAndSheet = require('../util/getDocumentAndSheet');
const rowMapper = require('../util/rowMapper');

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
    if (!document) return;

    if (!sheet) {
      await document.addSheet({
        title,
        headers,
        gridProperties: { columnCount: headers.length }
      });
    } else {
      sheet.setHeaderRow(headers);
    }
  },
  addLogs: async logs => {
    const { sheet } = await getDocumentAndSheet('logs');
    if (!sheet) return;

    sheet.addRows(logs.map(rowMapper));
  },
  upsertJoinData: async ({ title, joinData }) => {
    const { sheet } = await getDocumentAndSheet(title);
    if (!sheet) return;

    const rows = await sheet.getRows();
    const row = rows.find(row => row.id === joinData.id);
    if (!row) {
      addJoinData(sheet, rowMapper(joinData));
    } else {
      updateJoinData(row, joinData);
    }
  }
};
