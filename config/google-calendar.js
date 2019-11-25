const key = require('./golden-joy-259404-8ceb67f31036.json').private_key;
// const KEYFILE = `${__dirname}/credentials.json`;
const SERVICE_ACCT_ID = 'shanzm@golden-joy-259404.iam.gserviceaccount.com';
const CALENDAR_ID = {
  'primary': '<main-calendar-id>@gmail.com',
  'calendar-1': 'calendar1@group.calendar.google.com',
  'calendar-2': 'calendar2@group.calendar.google.com'
};
const TIMEZONE = 'UTC+08:00';

// module.exports.keyFile = KEYFILE;           //or if using json keys - module.exports.key = key;
module.exports.key = key;
module.exports.serviceAcctId = SERVICE_ACCT_ID;
// module.exports.calendarId = CALENDAR_ID;
module.exports.timezone = TIMEZONE;