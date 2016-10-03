#!/usr/bin/env node
'use strict';

let CronJob = require('cron').CronJob;
let exec    = require('child_process').exec;
let opts    = require('opts');
let lodash  = require('lodash');
let moment  = require('moment');
let util    = require('util');

//
// set parameter description
let parameterDescription = {
schedule :
  '\n[schedule]\n'+
  '  cron ranges\n'+
  '    Seconds     : 0-59\n'+
  '    Minutes     : 0-59\n'+
  '    Hours       : 0-23\n'+
  '    Day of Month: 1-31\n'+
  '    Months      : 0-11\n'+
  '    Day of Week : 0-6 ( 0:Sunday, 1:Monday, ..., 6:Saturday)\n'+
  '  examples\n'+
  '    $ croncli -s         "0 0 1 10 12 *" -c "node /tmp/hoge.js"\n'+
  '    $ croncli --schedule "* * * * * *"   -c "node /tmp/hoge.js"\n',
command : 
  '\n[command]\n'+
   '  examples\n'+
   '    $ croncli -s "* * * * * *" -c        "node /tmp/hoge.js"\n'+
   '    $ croncli -s "* * * * * *" --command "sh /tmp/piyo.sh"\n',
timeZone :
  '\n[timeZone]\n'+
   '  examples\n'+
   '    $ croncli -s "* * * * * *" -c "ls /tmp/" -t         "Asia/Tokyo"\n'+
   '    $ croncli -s "* * * * * *" -c "ls /tmp/" --timeZone "America/Los_Angeles"\n'
} 

//
// set parameters
opts.parse([
  {'short': 's', 'long': 'schedule',  'description': parameterDescription.schedule , 'value': true,  'required': true},
  {'short': 'c', 'long': 'command',   'description': parameterDescription.command,   'value': true,  'required': true},
  {'short': 't', 'long': 'timeZone',  'description': parameterDescription.timeZone,  'value': true,  'required': false},
], true);

let schedule = (opts.get('schedule')) ? opts.get('schedule') : null;
let command  = (opts.get('command'))  ? opts.get('command')  : null;
let timeZone = (opts.get('timeZone')) ? opts.get('timeZone') : null;

//
// check schedule
let scheduleList = String(schedule).split(' ');
if(lodash.size(scheduleList) !== 6){
  console.log(
    'Invalid cron schedule. schedule="' + schedule + '"\n',
    commandHelp.description
  );
  return;
}

//
// output schedule
console.log(
  'Input schedule: ' + 
  scheduleList[5] + '(week) ' + scheduleList[4] + '(month) ' +
  scheduleList[3] + '(day) ' + scheduleList[2] + '(hours) ' +
  scheduleList[1] + '(minutes) ' + scheduleList[0] + '(seconds)\n' + 
  'Input Command: ' + command
);

let job = new CronJob({
  cronTime : schedule, // 毎月1日の6時に起動
  start    : true,
  timeZone : timeZone,
  onTick   : function(){
    console.log(moment().format('YYYY/MM/DD HH:mm:ss') + ' $ ' + command);
    exec(command, function(err, stdout, stderr){
      if(err){
        console.log('err:', err);
      }
      if(stdout){
        console.log('info:', stdout);
      }
    });
  }
});

