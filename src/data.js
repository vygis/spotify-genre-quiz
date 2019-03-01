import { api, auth, irrelevantGenres, relatedGenres } from './spotify';
import { retryWhen, map, mergeMap, scan, switchMap, take, tap } from 'rxjs/operators';
import { sample, sampleSize, shuffle, times, uniqBy } from 'lodash';
import { from, interval } from 'rxjs';
import { stringify } from 'qs';
import imageToBase64 from 'image-to-base64';

function getGenreOptions(allGenres, genre, numberOfIncorrectOptions = 4, relGenres = relatedGenres) {
  return shuffle(
    shuffle(allGenres)
    .filter(g => g !== genre && !(relGenres[genre] || []).includes(g))
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
    map(resp => resp.data.genres.filter(genre => !irrelevantGenres.includes(genre))),
    map(genres => ({
      allGenres: genres,
      sampledGenres: times(resultSampleSize)
        .map(() => sample(genres)) // allowing the same genre to appear multiple times
        .reduce((pairs, genre) => {
          const found = pairs.find(pair => pair.genre === genre);
          if (found) {
            found.occurrences++;
          }
          return pairs.concat(found ? [] : { genre, occurrences: 1 });
        }, [])
    })),
    switchMap(({ allGenres, sampledGenres }) => from(sampledGenres).pipe(
      mergeMap(({ genre, occurrences }) => api.get(`/recommendations?seed_genres=${genre}`).pipe(
        map(({ data: { tracks }}) => sampleSize(
          uniqBy(
            tracks
              .filter(({ artists}) => artists.length <2)
              .map(({ album }) => album)
              .filter(({ album_type }) => album_type !== 'compilation'),
            'id'
          ),
          occurrences
        )),
        mergeMap(sampledTracks => from(sampledTracks).pipe(
          mergeMap(({ artists, images, name }) => from(imageToBase64(images[1].url)).pipe(
            map((base64data) => ({
              genre,
              artistName: artists[0].name,
              albumName: name,
              albumCover: base64data,
              genreOptions: getGenreOptions(allGenres, genre)
            }))
          ))
        ))
      ))
    )),
    scan((acc, curr) => [...acc, curr], []),
    map(entries => shuffle(entries))
  ).toPromise();
};
