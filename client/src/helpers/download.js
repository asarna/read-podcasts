import axios from 'axios';

export const download = (url) => {
	const urlEncoded = encodeURIComponent(url);
	return axios.get(`/download/${urlEncoded}`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error;
		})
}