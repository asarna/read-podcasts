import axios from 'axios';

export const download = (url) => {
	const urlEncoded = encodeURIComponent(url);
	axios.get(`/download/${urlEncoded}`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error;
		})
}