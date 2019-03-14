import Axios from 'axios-observable';
import { encode } from 'universal-base64';

const auth = Axios.create({
  baseURL: 'https://accounts.spotify.com/api',
  headers: {
    'Authorization': 'Basic ' + encode(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`),
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export {
  auth
};
