// Функция фильтрации по ключевым словам
function filterKeyword(movie, searchQuery) {
  return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
}

// Функция фильтрации "короткометражек"
function filterShortfilm(movie) {
  return movie.duration <= 40;
}

// Функция фильтрации фильмов
function filterMovies(inititalMovies, searchQuery, isShort) {
  if (!inititalMovies) {
    return [];
  } else if (isShort) {
    return inititalMovies
      .filter((movie) => filterShortfilm(movie))
      .filter((movie) => filterKeyword(movie, searchQuery));
  } else {
    return inititalMovies
      .filter((movie) => filterKeyword(movie, searchQuery));
  }
}

export default filterMovies;