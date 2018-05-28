
var fluent_ffmpeg = require("fluent-ffmpeg");
var fs = require('fs');
var path = require("path");
var dateFormat = require('dateformat');
const models = require("../api/models/index");

var FacebookVideoUploadService = require("./facebook-video-upload")

var facebookVideoUploadService = new FacebookVideoUploadService();

// const folder = 'test/cam1/';
// const hour = '20180513';

class MergeVideoService {
    mergeVideo(folder, hour) {
        var fluentFFmpeg = fluent_ffmpeg();
        var videoNames = [];

        fs.readdirSync(folder).forEach(file => {
            console.log(file);
            if (file.startsWith(hour)) {
                videoNames.push(folder + "/" + file);
            }
        })
        if (videoNames.length == 0) {
            console.log("No video to merge");
            return;
        }
        videoNames.forEach(function (videoName) {
            fluentFFmpeg = fluentFFmpeg.addInput(videoName);
        });

        console.log("Start merging video");
        var start = Date.now();

        this.merge(fluentFFmpeg, videoNames, folder, hour, 1)

        function deleteFiles(files, callback) {
            var i = files.length;
            files.forEach(function (filepath) {
                fs.unlink(filepath, function (err) {
                    i--;
                    if (err) {
                        callback(err);
                        return;
                    } else if (i <= 0) {
                        callback(null);
                    }
                });
            });
        }

    }

    merge(fluentFFmpeg, videoNames, folder, hour, count) {
        var self = this; // Get a reference to your object.
        count++;
        if(count  > 5){
            // send email to admin
            return;
        }
        fluentFFmpeg.mergeToFile(folder + "/merged_" + hour + '.mp4')
            .on('error', function (err) {
                console.log('Error ' + err.message);
                // Error ffmpeg exited with code 1: D:\Programing\NodeJS\CameraApp\video\cam2/20180524_220510camera2.mp4: Invalid data found when processing input
                var errFilePath = err.message.replace('ffmpeg exited with code 1: ', '');
                var x = errFilePath.indexOf('mp4:');
                errFilePath = errFilePath.substring(0, x + 3);
                console.log("file error: " + errFilePath);
                // report to admin
                fluentFFmpeg = fluent_ffmpeg();
                videoNames.forEach(function (videoName, index) {
                    if(errFilePath.indexOf(videoName) > -1){
                        videoNames.splice(index,1);
                    }
                });
               
                videoNames.forEach(function (videoName) {
                    fluentFFmpeg = fluentFFmpeg.addInput(videoName);
                });
                
                self.merge(fluentFFmpeg, videoNames, folder, hour, count);
            })
            .on('end', function () {
                console.log('Finished!');

                // delete  children file
                // deleteFiles(videoNames, function (err) {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         console.log('all child files are removed');
                //     }
                // });
                facebookVideoUploadService.upload(folder + "/merged_" + hour + '.mp4', hour);
            });

    }
    mergeAll() {
        models.Camera.findAll().then(result => {
            let arrCams = [];
            if (!result) {
                throw new Error("Not found camera !");
            }

            result.forEach(el => {
                arrCams.push({
                    id: el.id,
                    name: el.name,
                    namespace: el.namespace,
                    resolution: el.resolution,
                    fileOutput: el.fileOutput,
                    uri: el.uri,
                    location: el.location,
                });
            })
            var date = new Date();
            date.setHours(date.getHours() - 1);
            var hour = dateFormat(date, "yyyymmdd_HH"); // HH: 24h format
            arrCams.forEach(cam => {
                this.mergeVideo(path.resolve("./video/" + cam.namespace + "/"), hour);
            });
        }).catch(error => {
            console.log(error);
        });

    }
}
module.exports = MergeVideoService;



