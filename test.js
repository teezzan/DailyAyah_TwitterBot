var Twit = require('twit');
let config = require('./config')
var fs = require('fs')
let no_ayah = 1;
let surah_no = 1;

let T = new Twit(config);
var b64content = fs.readFileSync('./newpost.mp4', { encoding: 'base64' })









var filePath = './newpost.mp4'
T.postMediaChunked({ file_path: filePath, media_category: 'video/mp4' }, function (err, data, response) {
    console.log(data)
    var mediaIdStr = data.media_id_string
    var altText = "Quran Recitation."
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
    console.log('file 1 succesfully');
    setTimeout(() => {
        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = { status: 'DailyAyah.herokuapp.com #islam #quran', media_ids: [mediaIdStr] }
                console.log('file 2 succesfully = ');
                T.post('statuses/update', params, function (err, data, response) {
                    console.log(data)
                    console.log('file 3 succesfully');

                })

            } else {
                console.log(err);
            }


        })
    }, 3000);

})







// T.post('media/upload', { media_data: b64content }, function (err, data, response) {
//     // now we can assign alt text to the media, for use by screen readers and
//     // other text-based presentations and interpreters
//     var mediaIdStr = data.media_id_string
//     console.log("+>>>", data)
//     var altText = "Quran Recitation."
//     var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
//     console.log('file 1 succesfully');

//     T.post('media/metadata/create', meta_params, function (err, data, response) {
//         if (!err) {
//             // now we can reference the media and post a tweet (media will attach to the tweet)
//             var params = { status: 'DailyAyah.herokuapp.com #islam #quran', media_ids: [mediaIdStr] }
//             console.log('file 2 succesfully');

//             T.post('statuses/update', params, function (err, data, response) {
//                 console.log(data)
//                 console.log('file 3 succesfully');

//             })
//         } else {
//             console.log(err);
//         }


//     })
// })