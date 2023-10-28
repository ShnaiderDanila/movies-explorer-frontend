// Ошибки запросов
const SERVER_ERR = 'Что-то пошло не так! Пожалуйста повторите попытку позже';
const FAILED_TO_FETCH_ERR = 'Failed to fetch';
const FAILED_TO_FETCH_ERR_MESSAGE = 'Ошибка сервера! Пожалуйста повторите попытку позже';
const BAD_REQUEST_ERR_CODE = '400'; 
const BAD_REQUEST_ERR_MESSAGE = 'Введены некорректные данные';
const UNAUTHORIZED_ERR_CODE = '401';
const UNAUTHORIZED_ERR_MESSAGE = 'Введен неправильный email или пароль';
const CONFLICT_ERR_CODE = '409';
const CONFLICT_ERR_MESSAGE = 'Пользователь с таким email уже зарегистрирован';
const TOO_MANY_REQUESTS_ERR_CODE = '429';
const TOO_MANY_REQUESTS_ERR_MESSAGE = '429';
const DATA_PROCESSING_ERR = `Во время запроса произошла ошибка. 
Возможно, проблема с соединением или сервер недоступен. 
Подождите немного и попробуйте ещё раз`;

// Ответы на успешные запросы
const SUCCESS_UPDATE_PROFILE = 'Редактирование выполнено успешно!';

// Ошибки поиска фильмов
const MOVIES_NOT_FOUND_ERR = 'По вашему запросу ничего не найдено';
const SAVED_MOVIES_NOT_FOUND_ERR = 'Сохраненные фильмы не найдены';

// Переменные 
const BASE_URL_BEATFILM_API = 'https://api.nomoreparties.co';

// Лимиты отображения карточек фильмов
const MOVIES_LIMIT_16 = 16;
const MOVIES_LIMIT_12 = 12;
const MOVIES_LIMIT_8 = 8;
const MOVIES_LIMIT_5 = 5;

// Лимиты отображения карточек фильмов по кнопке "Еще"
const MOVIES_LIMIT_STEP_4 = 4;
const MOVIES_LIMIT_STEP_3 = 3;
const MOVIES_LIMIT_STEP_2 = 2;

export {
  SERVER_ERR,
  FAILED_TO_FETCH_ERR,
  FAILED_TO_FETCH_ERR_MESSAGE,
  BAD_REQUEST_ERR_CODE,
  BAD_REQUEST_ERR_MESSAGE,
  UNAUTHORIZED_ERR_CODE,
  UNAUTHORIZED_ERR_MESSAGE,
  CONFLICT_ERR_CODE,
  CONFLICT_ERR_MESSAGE,
  TOO_MANY_REQUESTS_ERR_CODE,
  TOO_MANY_REQUESTS_ERR_MESSAGE,
  DATA_PROCESSING_ERR,
  SUCCESS_UPDATE_PROFILE,
  MOVIES_NOT_FOUND_ERR,
  SAVED_MOVIES_NOT_FOUND_ERR,
  MOVIES_LIMIT_16,
  MOVIES_LIMIT_12,
  MOVIES_LIMIT_8,
  MOVIES_LIMIT_5,
  MOVIES_LIMIT_STEP_4,
  MOVIES_LIMIT_STEP_3,
  MOVIES_LIMIT_STEP_2,
  BASE_URL_BEATFILM_API,
};