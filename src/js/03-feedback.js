import throttle from 'lodash.throttle';

const links = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input[type="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
};

const STORAGE_KEY = 'feedback-form-state';

populateFormFields();

let newStorageValue = {};

const storedValue = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (storedValue) {
  newStorageValue.email = storedValue.email || '';
  newStorageValue.message = storedValue.message || '';
}

links.form.addEventListener('input', throttle(onFormInputClick, 500));
links.form.addEventListener('submit', onButtonSubmitClick);

function onFormInputClick(event) {
  event.preventDefault();

  newStorageValue[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorageValue));
}

function populateFormFields() {
  const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (storageData) {
    links.input.value = storageData.email ? storageData.email : '';
    links.textarea.value = storageData.message ? storageData.message : '';
  }
}

function onButtonSubmitClick(event) {
  event.preventDefault();

  const { email, message } = event.target.elements;

  if (!email.value || !message.value) {
    return alert('Please fill in all the fields!');
  }

  console.log(newStorageValue);

  newStorageValue = {};

  event.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}
