import Axios from 'axios-observable';

const instance = Axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000,
  headers: {
    'Authorization': 'Bearer ' + process.env.SPOTIFY_TOKEN
  }
})
export default instance;
