import { api, auth } from './spotify';
import { retryWhen, map, mergeMap, repeat, scan, switchMap, take, tap } from 'rxjs/operators';
import { sampleSize, shuffle } from 'lodash';
import { from, interval, of } from 'rxjs';
import { stringify } from 'qs';

function getGenreOptions(allGenres, genre, numberOfIncorrectOptions = 4) {
  return shuffle(
    shuffle(allGenres)
    .filter(g => g !== genre) //TODO improve to filter out incorrect genres that are too similar to the correct one
    .splice(0, numberOfIncorrectOptions)
    .map(g => ({ value: g, isCorrect: false }))
    .concat({ value: genre, isCorrect: true})
  );
}

export default async function getQuizData (resultSampleSize) {
  return interval(1000).pipe(
    mergeMap(() => api.get('/recommendations/available-genre-seeds')),
    retryWhen(errors => errors.pipe(
      switchMap(error => auth.post(`/token`, stringify({'grant_type': 'client_credentials'})).pipe(
        tap(({ data }) => api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`),
        take(1)
      ))
    )),
    take(1),
    map(resp => ({
      allGenres: resp.data.genres,
      sampledGenres: sampleSize(resp.data.genres, resultSampleSize)
    })),
    switchMap(({ allGenres, sampledGenres }) => from(sampledGenres).pipe(
      mergeMap(genre => api.get(`/recommendations?seed_genres=${genre}`).pipe(
        map(response => ({
          genre,
          artistName: response.data.tracks[0].album.artists[0].name,
          albumName: response.data.tracks[0].album.name,
          albumCoverUrl: response.data.tracks[0].album.images[1].url,
          genreOptions: getGenreOptions(allGenres, genre)
        }))
      ))
    )),
    scan((acc, curr) => [...acc, curr], [])
  ).toPromise();
};
