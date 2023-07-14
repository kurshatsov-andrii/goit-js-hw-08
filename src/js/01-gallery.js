// // Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
// Описаний в документації

import SimpleLightbox from 'simplelightbox';

// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

//Знаходимо селектор gallery
const galleryList = document.querySelector('.gallery');

//Формуємо розмітку
const galleryListMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
    </li>`;
  })
  .join('');

galleryList.innerHTML = galleryListMarkup;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  disableScroll: true,
});
