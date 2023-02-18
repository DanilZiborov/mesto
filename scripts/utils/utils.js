//Элементы попапа-картинки

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__image-caption');

//Общие функции закрытия и открытия для попапов

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscape);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

//Показать попап-картинку

export function showImagePopup(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.parentElement.querySelector('.card__title').textContent;
  popupImageCaption.textContent = evt.target.parentElement.querySelector('.card__title').textContent;
  openPopup(popupTypeImage);
}

