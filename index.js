let fs = require('fs');
const textToImage = require('text-to-image');
let axios = require('axios');
let surah = require('./surah.json');
function randomint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let no_ayah = 0;

let surah_no = randomint(0, 114);

function gen() {

    surah_no = randomint(0, 114);
    no_ayah = randomint(2, surah[surah_no].count);

    axios.get(`http://api.alquran.cloud/v1/ayah/${2}:${256}/editions/en.sahih,ar.alafasy`)
        .then((response) => {
            // console.log(response.data.data);
            return response.data.data
        })
        .then((data) => {
            let enText = data[0].text;
            let arText = data[1].text;
            console.log({ enText, arText });

            return { enText, arText }


        })
        .then((textObj) => {

            // var tee = "This library abstracts the complex command-line usage of ffmpeg into a fluent, easy to use node.js module. In order to be able to use this module, make sure you have ffmpeg installed on your system (including all necessary encoding libraries like libmp3lame or libx264).\nThis is the documentation for fluent-ffmpeg 2.x. You can still access the code and documentation for fluent-ffmpeg 1.7 here."
            textToImage.generate(`\n\n${textObj.arText} \n\n\n ${textObj.enText}\n`).then(function (base64Image) {
                // console.log(base64Image);
                base64Image = base64Image.split(';base64,').pop();
                fs.writeFile('./images/image.png', base64Image, { encoding: 'base64' }, function (err) {
                    console.log('File created');
                });
            });
        })

}
gen();