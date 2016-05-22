var schedule = require('node-schedule');
var casperBot = require('./casperBot');

var j = schedule.scheduleJob('43 * * * *', function() {
  var d = new Date();
  console.log('node schedule working', d);
})