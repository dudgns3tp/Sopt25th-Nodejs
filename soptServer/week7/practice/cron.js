const cron = require('node-cron');
const moment = require('moment');

cron.schedule('* * * * * *', () => console.log('매 1초마다 실행', moment().format()));