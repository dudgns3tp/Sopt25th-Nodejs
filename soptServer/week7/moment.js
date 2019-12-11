const moment = require('moment');

var t1 = new Date(2019, 12, 22);
var t2 = new Date(2020, 1, 4);
var diff2 = {
seconds: moment.duration(t2 - t1).asSeconds(), // 1123200
minutes: moment.duration(t2 - t1).asMinutes(), // 18720
hours: moment.duration(t2 - t1).asHours() //312
};
console.log(diff2);
