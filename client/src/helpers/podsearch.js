import axios from 'axios';

export const getPodSearch = (query) => {
  const url = `http://gpodder.net/search.json?q=${query}`;
  return axios.get(url)
    .then((response) => {
      let podcasts = response.data;
      podcasts.sort((a, b) => { //sort by url
        if (a.website === b.website) {
          return (a.subscribers < b.subscribers) ? 1 : -1;
        }
        return (a.website > b.website) ? 1 : -1;
      });
      let filteredPods = podcasts.filter((pod, index) => { //remove duplicates
        return ((index === 0) || (pod.website !== podcasts[index - 1].website));
      });
      filteredPods.sort((a, b) => {
        return (a.subscribers < b.subscribers) ? 1 : -1;
      });
      return filteredPods;
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