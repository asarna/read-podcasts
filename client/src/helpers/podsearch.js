import axios from 'axios';

let query;

export const podSearch = () => {
  query = document.querySelector('#search').value;
  const url = `http://gpodder.net/search.json?q=${query}`;
  console.log('called', url);
  return axios.get(url)
    .then((response) => {
      console.log(response);
      return response.data;
    })
}