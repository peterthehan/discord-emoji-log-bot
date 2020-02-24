module.exports = ({ id, ...props }) => ({
  id: `="${id}"`,
  ...props
});
