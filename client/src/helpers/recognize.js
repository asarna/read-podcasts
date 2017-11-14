import axios from 'axios';
import recognizeFile from 'watson-speech/speech-to-text/recognize-file';

let token;
let stream;

const tokenConfig = {
  url: '/api/token',
  method: 'get',
}

const getToken = () => {
  return axios(tokenConfig)
    .then((response) => {
      token = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const stopRecognize = () => {
  if (stream) {
    stream.stop();
  }
}

export const recognize = () => {
  getToken()
    .then(() => {
      stream = recognizeFile({
        token: token,
        file: '/file.mp3',
        outputElement: '#output',
        play: true
      })
    })
}

