import Axios from 'axios-observable';

const api = Axios.create({
  baseURL: 'https://api.spotify.com/v1'
})
export {
  api
};
