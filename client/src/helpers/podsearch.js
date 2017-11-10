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

export const podInfo = (feedUrl) => {
	const url = `http://gpodder.net/api/2/data/podcast.json?url=${feedUrl}`;
	return axios.get(url)
		.then((response) => {
			console.log(response);
			return response.data;
		})
}