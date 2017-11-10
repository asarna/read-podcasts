import axios from 'axios';

let query;

export const podSearch = () => {
  query = document.querySelector('#search').value;
  const url = `http://gpodder.net/search.json?q=${query}`;
  console.log('called', url);
  return axios.get(url)
    .then((response) => {
      return response.data;
    })
}

export const episodeList = (feedUrl) => {
	const url = `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`;
	return axios.get(url)
		.then((response) => {
			return response.data;
		})
}