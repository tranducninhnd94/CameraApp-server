
var fluent_ffmpeg = require("fluent-ffmpeg");
var fs = require('fs');
var FacebookVideoUploadService =  require("./facebook-video-upload")

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
        if(videoNames.length == 0) {
            console.log("No video to merge");
            return;
        }
        videoNames.forEach(function (videoName) {
            fluentFFmpeg = fluentFFmpeg.addInput(videoName);
        });

        console.log("Start merging video");
        var start = Date.now();

        fluentFFmpeg.mergeToFile(folder + "/merged_" + hour + '.mp4')
            .on('error', function (err) {
                console.log('Error ' + err.message);
                // report to admin
            })
            .on('end', function () {
                console.log('Finished!');
                var end = Date.now();
                var elapsed = end - start;
                console.log(elapsed);
                // delete  children file
                deleteFiles(videoNames, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('all child files are removed');
                    }
                });
                facebookVideoUploadService.upload(folder + "/merged_" + hour + '.mp4',hour);
            });

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

}
module.exports = MergeVideoService;



