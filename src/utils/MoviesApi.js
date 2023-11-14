class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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
  * @param {object} options объект настроек HTTP запроса
  * @returns {(json|string)} json с данными сервера или строка с ошибкой с сервера
  */
  _request(options) {
    options.headers = this._headers;
    return fetch(`${this._baseUrl}`, options)
      .then(res => {
        return this._renderServerResponce(res)
      })
  }

  /**
   * Метод загрузки фильмов с API beatfilm-movies
   * @return {function} возвращает результат работы this._request с переданными аргументами   
   */
  getMovies() {
    return this._request({ method: 'GET' })
  }

}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  },
});

export { moviesApi };


