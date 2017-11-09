import axios from 'axios';
import * as FormData from 'form-data';
import recognizeFile from 'watson-speech/speech-to-text/recognize-file';

//const audioFile = new FormData();

let config = {
  url: 'https://stream.watsonplatform.net/speech-to-text/api/v1/recognize',
  method: 'post',
  headers: {
    'Content-Type': 'audio/flac',
    'Transfer-Encoding': 'chunked',
    'X-Watson-Authorization-Token': ''
  },
  data: './audio-file.flac'
}

const tokenConfig = {
  url: '/api/token',
  method: 'get',
}

const getToken = () => {
  return axios(tokenConfig)
    .then((response) => {
      console.log('response:', response);
      config.headers['X-Watson-Authorization-Token'] = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const recognize = () => {
      getToken()
      .then(() => {
        return axios(config)
          .then((response) => {
            console.log('response: ', response);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      
};

