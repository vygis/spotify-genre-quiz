import http from './http';
import { map, mergeMap, scan, switchMap } from 'rxjs/operators';
import { sampleSize, shuffle } from 'lodash';
import { from } from 'rxjs';

function getGenreOptions(allGenres, genre, incorrectGenreSampleSize = 4) {
  return shuffle(
    shuffle(allGenres)
    .filter(g => g !== genre) //TODO improve to filter out incorrect genres that are too similar to the correct one
    .splice(0, incorrectGenreSampleSize)
    .map(g => ({ value: g, isCorrect: false }))
    .concat({ value: genre, isCorrect: true})
  );
}

export default async function getResults (resultSampleSize) {
  return http.get('/recommendations/available-genre-seeds').pipe(
    map(resp => ({
      allGenres: resp.data.genres,
      sampledGenres: sampleSize(resp.data.genres, resultSampleSize)
    })),
    switchMap(({ allGenres, sampledGenres }) => from(sampledGenres).pipe(
      mergeMap(genre => http.get(`/recommendations?seed_genres=${genre}`).pipe(
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
