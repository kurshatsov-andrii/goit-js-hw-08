// Add imports above this line

import { galleryItems } from './gallery-items';

//Імпортуємо бібліотеку SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

//Отримаємо посилання на gallery
const galleryList = document.querySelector('.gallery');

//Додаємо розмітку
const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
  <li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>`;
  })
  .join('');

//Змінюємо HTML-вміст галереї на сторінці
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

//console.log(galleryMarkup);

//Додаємо опції до галереї - заголовок з alt та затримку перед показом підпису - 250 мс
new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
