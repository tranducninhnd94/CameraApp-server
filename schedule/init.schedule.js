const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");
const cameraPath = "../ffmpeg/camera.config.json";

const rule = new schedule.rescheduleJob();
rule.second = 00;
// rule.minute = 59;
// rule.hour = 23;
// rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];

const job = schedule.scheduleJob(rule, (fireDate) => {
    process.nextTick(() => {
        let newFolder = path.join(__dirname);
        console.log("new folder : ", newFolder);
        if (!fs.existsSync(path.join(newFolder, "camera1"))) {
            fs.mkdirSync(path.join(newFolder, "camera1"));
        }

        // edit config camera
        editCameraFile();

    })
})


function editCameraFile() {
    let data = fs.readFileSync(cameraPath);
    if (!data) {
        throw new Error("Can't not file camera.config !");
    }
    objCam = JSON.parse(data);
    if (!objCam || objCam.camera.length == 0) {
        throw new Error("No camera !");
    }

    arrCams = objCam.camera;

    arrCams.forEach(cam => {
        cam.fileOutput = "newfile";
    });

    const content = JSON.stringify(objCam);

    fs.writeFile(cameraPath, content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

}
