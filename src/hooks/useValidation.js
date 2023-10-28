import { useCallback, useState } from 'react';

// Кастомный хук для валидации полей формы
function useValidation () {
  // Стейт-переменная значения инпута
  const [inputValues, setInputValues] = useState({});
  // Стейт-переменная текста ошибки валидации
  const [errorMessages, setErrorMessages] = useState({});
    // Стейт-переменная валидности формы 
  const [isValidForm, setIsValidForm] = useState(false);

  // Функция обработки валидации при срабатывании события
  function handleChangeValidation(evt) {
    const {name, value} = evt.target;
    const error = evt.target.validationMessage;
    const isValidForm = evt.target.closest("form").checkValidity();
    setInputValues({ ...inputValues, [name]: value});
    setErrorMessages({ ...errorMessages, [name]: error});
    setIsValidForm(isValidForm);
  };

  const resetValidation = useCallback((newInputValues={}, newErrorMessages={}, newIsValidForm = false) => {
    setInputValues(newInputValues);
    setErrorMessages(newErrorMessages);
    setIsValidForm(newIsValidForm);
  }, [setInputValues, setErrorMessages, setIsValidForm]);

  return {
    inputValues,
    errorMessages,
    isValidForm,
    handleChangeValidation,
    resetValidation,
  }
}

export default useValidation;