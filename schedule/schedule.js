var cron = require('node-cron');
var path = require("path");
var dateFormat = require('dateformat');
const MergeVideoService = require("../lib/merge-video");
const mergeVideoService = new MergeVideoService();
// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

class ScheduleService {
    setScheduler(){
        cron.schedule('5 * * * *', function(){
            console.log('running a task every hour at 5 minutes');
            var hour =  dateFormat(new Date(),"yyyymmdd_HH"); // HH: 24h format
            mergeVideoService.mergeVideo(path.resolve("./video/cam1/"), hour);
          });
    }
}
module.exports = ScheduleService;
