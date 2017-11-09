import axios from 'axios';
import recognizeFile from 'watson-speech/speech-to-text/recognize-file';

let token;

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

export const recognize = () => {
  getToken()
    .then(() => {
      recognizeFile({
        token: token,
        file: document.querySelector('#audiofile').files[0],
        outputElement: '#output',
        play: true
      })
    })
}

