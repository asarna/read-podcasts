const express = require("express");
const watson = require('watson-developer-cloud');

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

app.get("/api/greeting", (req, res) => {
  const param = req.query.q;

  res.json({ greeting: param + ' from the server'});

});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
