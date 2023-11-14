import { MAX_DURATION_SHORT_MOVIE } from '../constants/constants';

// Функция фильтрации по ключевым словам
function filterKeyword(movie, searchQuery) {
  return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
}

// Функция фильтрации "короткометражек"
function filterShortMovie(movie) {
  return movie.duration <= MAX_DURATION_SHORT_MOVIE;
}

// Функция фильтрации фильмов
function filterMovies(inititalMovies, searchQuery, isShort) {
  if (!inititalMovies) {
    return [];
  } else if (isShort) {
    return inititalMovies
      .filter((movie) => filterShortMovie(movie))
      .filter((movie) => filterKeyword(movie, searchQuery));
  } else {
    return inititalMovies
      .filter((movie) => filterKeyword(movie, searchQuery));
  }
}

export default filterMovies;