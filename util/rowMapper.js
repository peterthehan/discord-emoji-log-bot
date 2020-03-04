module.exports = row =>
  Object.keys(row).reduce((newRow, key) => {
    newRow[key] = key.toLowerCase().endsWith('id')
      ? `="${row[key]}"`
      : row[key];

    return newRow;
  }, {});
