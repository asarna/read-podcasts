import axios from 'axios';

let query;
const apiKey = '6vf2n8xjaujvgkbhacgucxwynvu9jn6z6tkj3l94';

export const getPodSearch = () => {
  query = document.querySelector('#search').value;
  const url = `http://gpodder.net/search.json?q=${query}`;
  return axios.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
    	return error;
    })
}

export const getEpisodes = (feedUrl) => {
  const feedUrlEncoded = encodeURIComponent(feedUrl);
  return axios.get(`/episodes/${feedUrlEncoded}`).then((response) => {
    return response.data;
  });
}