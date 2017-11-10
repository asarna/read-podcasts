import axios from 'axios';

let query;
<<<<<<< HEAD
=======
const apiKey = '6vf2n8xjaujvgkbhacgucxwynvu9jn6z6tkj3l94';
>>>>>>> 8a08bc5bdd07472366b2fbc2e9385f05388b697e

export const podSearch = () => {
  query = document.querySelector('#search').value;
  const url = `http://gpodder.net/search.json?q=${query}`;
<<<<<<< HEAD
  console.log('called', url);
  return axios.get(url)
    .then((response) => {
      console.log(response);
      return response.data;
    })
=======
  return axios.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
    	return error;
    })
}

export const episodeList = (feedUrl) => {
	const url = `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}&api_key=${apiKey}`;
	return axios.get(url)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
    	return error;
    })

>>>>>>> 8a08bc5bdd07472366b2fbc2e9385f05388b697e
}