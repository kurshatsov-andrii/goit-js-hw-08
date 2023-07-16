//Імпортуємо бібліотеки Vimeo та lodash.throttle
import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

//Отримаємо посилання на iframe
const iframe = document.querySelector('iframe');

//Створюємо новий екземпляр
const player = new Vimeo(iframe);
const storageKey = 'videoplayer-current-time';

//Отримаємо поточний час і зберегаємо його в localStorage
player.on(
  'timeupdate',
  throttle(event => {
    const currentTime = event.seconds;
    localStorage.setItem(storageKey, currentTime);
  }, 1000)
);

//Завантажуємо поточний час з localStorage і переходимо до цього часу
const currentTime = localStorage.getItem(storageKey);
if (currentTime) {
  player.setCurrentTime(currentTime);
}
