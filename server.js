const express = require("express");
const watson = require('watson-developer-cloud'); 
const fs = require('fs');
const request = require('request');

const app = express();

const stt = new watson.SpeechToTextV1({
  username: '68c7c3e6-0b64-484e-aca3-e7f6b1caac0c',
  password: 'gYZ8lxIpPStB'
});

const authService = new watson.AuthorizationV1(stt.getCredentials());

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.static('static'));

// Get token using your credentials
app.get('/api/token', (req, res, next) => {
  authService.getToken((err, token) => {
    if (err) {
      next(err);
    } else {
      res.send(token);
    }
  });
});

app.get('/download/:url', (req, res, next) => {
  const urlDecoded = decodeURIComponent(req.params.url);
  const file = fs.createWriteStream(__dirname + "/static/file.mp3");
  request(urlDecoded).pipe(file).on('finish', () => {
    console.log('done');
    next();
  });  
  //fs.createReadStream(__dirname+ '/client/audio/file.mp3').pipe(request.post('https://stream.watsonplatform.net/speech-to-text/api'))
});

app.get('/episodes/:feedUrl', (req, res, next) => {
  const apiKey = '6vf2n8xjaujvgkbhacgucxwynvu9jn6z6tkj3l94';
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${req.params.feedUrl}&api_key=${apiKey}`;
  request(url, (error, response, body) => {
    res.json(JSON.parse(body));
  });
});


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
