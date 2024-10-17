const moment = require('moment');

module.exports = (timestamp) => {
  return moment(timestamp).format('MMM DD, YYYY [at] hh:mm a');
};
