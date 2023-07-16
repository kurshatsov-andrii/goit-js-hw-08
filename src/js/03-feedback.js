//Імпортуємо бібліотеку lodash.throttle
import throttle from 'lodash.throttle';

//Формуємо об'єкт посилань
const links = {
  orderForm: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('input[type="email"]'),
  inputMessage: document.querySelector('textarea[name="message"]'),
};

const storageKey = 'feedback-form-state';

//Перевіряємо заповнення полів форми
checkFillingFormFields();

let newDataValue = {};

//Читаємо данні зі сховища
const dataValue = JSON.parse(localStorage.getItem(storageKey));

//Під час завантаження сторінки перевіряю стан сховища, і якщо там є збережені дані,
//заповнюю ними поля форми. В іншому випадку поля повинні бути порожніми
if (dataValue) {
  newDataValue.email = dataValue.email || '';
  newDataValue.message = dataValue.message || '';
}

//Додаємо случачів на input та submit
//Сховище оновлюється не частіше, ніж раз на 500 мілісекунд
links.orderForm.addEventListener('input', throttle(onFormInputClick, 500));
links.orderForm.addEventListener('submit', onButtonSubmitClick);

//Фукція запису даних у сховище
function onFormInputClick(event) {
  event.preventDefault();
  newDataValue[event.target.name] = event.target.value;
  localStorage.setItem(storageKey, JSON.stringify(newDataValue));
}

//Функція перевірки заповнення полів форми
function checkFillingFormFields() {
  const storageData = JSON.parse(localStorage.getItem(storageKey));
  if (storageData) {
    links.inputEmail.value = storageData.email ? storageData.email : '';
    links.inputMessage.value = storageData.message ? storageData.message : '';
  }
}

//Фукція натискання на кнопку
function onButtonSubmitClick(event) {
  event.preventDefault();
  const { email, message } = event.target.elements;
  if (!email.value || !message.value) {
    return alert('Треба заповнити всі поля для відправки повідомлення!');
  }
  //Під час сабміту форми очищую сховище і поля форми, а також вивожу у консоль об'єкт
  //з полями email, message та їхніми поточними значеннями
  console.log(newDataValue);
  newDataValue = {};
  event.currentTarget.reset();
  localStorage.removeItem(storageKey);
}
