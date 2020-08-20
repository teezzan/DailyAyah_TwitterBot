var ffmpeg = require('fluent-ffmpeg');
let axios = require('axios');


// make sure you set the correct path to your video file
// .then
var proc = ffmpeg('./cppn1bw.png')
    .loop(2)
    // .inputFPS(1)
    .input('./yamero.mp3')
    .audioCodec('copy')

    .on('end', function () {
        console.log('file has been converted succesfully');
    })
    .on('error', function (err) {
        console.log('an error happened: ' + err.message);
    })
    // save to file
    .save('./new.mp4');