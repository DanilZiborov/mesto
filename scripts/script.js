
//Массив изначальных карточек

const initialCards = [
  {
    name: 'Железноводск',
    link: 'images/zhl.png'
  },
  {
    name: 'Архыз',
    link: 'images/arh.png'
  },
  {
    name: 'Бермамыт',
    link: 'images/berm.png'
  },
  {
    name: 'Лермонтов',
    link: 'images/lerm.png'
  },
  {
    name: 'Новотерский',
    link: 'images/nvtr.png'
  },
  {
    name: 'Пятигорск',
    link: 'images/ptg.png'
  },
];

//Элементы попапа редкатирования личных данных

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.form')
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');
const closeButton = popup.querySelector('.popup__close-button')
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Элементы карточек

const cardsSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;


//Логика открытия попапа редактирования личных данных


function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveChanges(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}


// Логика добавления дефолтных карточек

function showInitialCards() {
  initialCards.forEach(item => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardsSection.append(cardElement);
  });
};

// Слушатели событий

editButton.addEventListener('click', openPopup);
popupForm.addEventListener('submit', saveChanges);
closeButton.addEventListener('click', closePopup);

// Генерим дефолтные карточки

showInitialCards();


