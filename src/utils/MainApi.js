class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  /**
   * Универсальный метод обработки ответа от сервера
   * @private
   * @param {object} res объект response с сервера
   * @returns {(json|string)} json с данными сервера или строку с ошибкой с сервера
   */
  _renderServerResponce(res) {
    if (res.ok) {
      return res.json();
    } else {
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  /**
  * Универсальный метод запроса с проверкой ответа
  * @private
  * @param {string} url эндпоинт следующий за базовым URL
  * @param {object} options объект настроек HTTP запроса
  * @returns {(json|string)} json с данными сервера или строка с ошибкой с сервера
  */
  _request(url, options) {
    options.headers = this._headers;
    options.credentials = this._credentials;
    return fetch(`${this._baseUrl}/${url}`, options)
      .then(res => {
        return this._renderServerResponce(res)
      })
  }

  /**
   * Метод загрузки информации о текущем пользователе, с сервера
   * @return {function} возвращает результат работы this._request с переданными аргументами   
   */
  getUserInfo() {
    return this._request(`users/me`, { method: 'GET' })
  }

  /**
   * Метод обновления профиля пользователя на сервере
   * @param {string} name имя пользователя страницы
   * @param {string} email email пользователя страницы
   * @return {function} возвращает результат работы this._request с переданными аргументами   
   */
  updateUserInfo(email, name) {
    return this._request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        email: email,
        name: name
      }),
    })
  }

  /**
   * Метод регистрации пользователя
   * @param {string} email email пользователя из инпута формы
   * @param {string} password пароль пользователя из инпута формы
   * @param {string} name имя пользователя из инпута формы
   * @returns {function} возвращает результат работы this._request с переданными аргументами 
   */
  signup(email, password, name) {
    return this._request(`signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      }),
    })
  }

  /**
  * Метод авторизации пользователя
  * @param {string} email email пользователя из инпута формы
  * @param {string} password пароль пользователя из инпута формы
  * @returns {function} возвращает результат работы this._request с переданными аргументами 
  */
  signin(email, password) {
    return this._request(`signin`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
  }

  /**
  * Метод выхода из личного кабинета пользователя
  * @returns {function} возвращает результат работы this._request с переданными аргументами 
  */
  signOut() {
    return this._request(`signout`, { method: 'POST' })
  }

  /**
   * Метод загрузки сохраненных фильмов с сервера
   * @return {function} возвращает результат работы this._request с переданными аргументами   
   */
  getSavedMovies() {
    return this._request(`movies`, { method: 'GET' })
  }

  /**
   * Метод сохранения фильма
   * @param {string} data объект с информацией о фильме
   * @return {function} возвращает результат работы this._request с переданными аргументами   
   */
  saveMovie(data) {
    return this._request(`movies`, {
      method: 'POST',
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    })
  }

  /**
  * Метод удаления сохраненного фильма
  * @param {string} movieId свойство _id внутри объекта movie
  * @return {function} возвращает результат работы this._request с переданными аргументами   
  */
  deleteMovie(movieId) {
    return this._request(`movies/${movieId}`, { method: 'DELETE' })
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
});

export { mainApi };


