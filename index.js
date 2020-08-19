let fs = require('fs');
let textToImage = require('text-to-image');
let axios = require('axios');
let surah = require('./surah.json');
let reciter = require('./recite')
let no_ayah = 1;

let surah_no = 1;

function randomint(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function parseName(name) {
  return name
    .substring(name.indexOf("/arabic/") + 8, name.indexOf("/64/"))
    .replace(/_/g, " ");
}
function parseNum(num) {
  if (num / 10 < 1) {
    return `00${num}`;
  }
  if (num / 10 < 10) {
    return `0${num}`;
  }
  if (num / 10 >= 10) {
    return `${num}`;
  }
}



function gen() {
  surah_no = randomint(1, 114);
  no_ayah = randomint(2, surah[surah_no - 1].count);
  no_reciter = randomint(0, reciter.length - 1)
  rec_Url = `${reciter[no_reciter].audio_url_bit_rate_64}${parseNum(surah_no)}${parseNum(no_ayah)}.mp3`

  axios.get(`http://api.alquran.cloud/v1/ayah/${surah_no}:${no_ayah}/editions/en.sahih,ar.alafasy`)
    .then((response) => {
      // console.log(response.data.data);
      return response.data.data
    })
    .then((data) => {
      let enText = data[0].text;
      let arText = data[1].text;
      let audUrl = data[1].audio;
      console.log({ enText, arText, rec_Url });

      return { enText, arText }


    })
    .then((textObj) => {

      textToImage.generate(`\n${textObj.arText} \n\n ${textObj.enText}\n\nQuran ${surah_no}:${no_ayah}\nReciter: ${parseName(rec_Url)}\n\nDailyAyahBot`, {
        fontFamily: 'Comic Sans',
        margin: 10,
        textAlign: "center",
        fontSize: 22,
        // bgColor: "black",
        // textColor: "white"
      }).then(function (base64Image) {
        // console.log(base64Image);
        base64Image = base64Image.split(';base64,').pop();
        fs.writeFile('./images/image.png', base64Image, { encoding: 'base64' }, function (err) {
          console.log('File created');
        });
      });
    })

}
gen();