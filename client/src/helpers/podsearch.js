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
	const url = `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}&api_key=${apiKey}`;
	return axios.get(url)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
    	return error;
    })
}