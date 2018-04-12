const fs = require("fs");
const path = require("path");
const rtsp = require("../lib/rtsp-ffmpeg");
module.exports = io => {

    let objCam = {};
    let arrCams = [];

    let data = fs.readFileSync(path.join(__dirname + "/camera.config.json"));
    if (!data) {
        throw new Error("Can't not file camera.config !");
    }
    objCam = JSON.parse(data);
    if (!objCam || objCam.camera.length == 0) {
        throw new Error("No camera !");
    }

    arrCams = objCam.camera;

    // send camera information 
    io.on("connection", function (socket) {
        socket.emit("start", arrCams);
    });

    // create stream
    let arrStream = [];

    arrCams.forEach(cam => {
        let stream = new rtsp.FFMpeg({ input: cam.uri, resolution: cam.resolution, quality: cam.quality, fileOutput: cam.fileOutput });
        stream.on("start", function () {
            console.log("stream " + cam.name + " started");
        });
        stream.on("stop", function () {
            console.log("stream " + cam.name + " stopped");
        });
        arrStream.push(stream);
    });

    //create namespace and  send data
    arrStream.forEach((camStream, i) => {
        let ns = io.of(arrCams[i].namespace);

        ns.on("connection", socket => {
            console.log("connected to came", cam.name);

            var pipeStream = data => {
                socket.emit("data", data);
            };

            camStream.on("data", pipeStream)

            socket.on("disconnect", () => {
                console.log("disconnected from /cam" + arrCams[i].name);
                camStream.removeListener("data", pipeStream);
            });
        })
    });


}

