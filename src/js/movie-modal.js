import { getMovies } from './api/fetch-movie';
import { ID_URL, BASE_IMG_URL, API_KEY } from './api/api-vars';

const refs = {
  backdrop: document.querySelector('.backdrop'),
  closeBtn: document.querySelector('button[data-dismiss="modal"]'),
  cardModal: document.querySelector('.gallery'),
  imgContainer: document.querySelector('.js-modal'),
};

const { backdrop, closeBtn, cardModal, imgContainer } = refs;

export default function addAllEventListenersModal() {
  closeBtn.addEventListener('click', onCloseBtnClick);
  window.addEventListener('keydown', onKeydownEscape);
  backdrop.addEventListener('click', onBackdropClick);
}

function onCloseBtnClick(e) {
  e.preventDefault();
  backdrop.classList.add('is-hidden');
  removeAllEventListenersModal();
}

function onKeydownEscape(e) {
  e.preventDefault();
  if (e.key === 'Escape') {
    backdrop.classList.add('is-hidden');
  }
  removeAllEventListenersModal();
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('backdrop')) {
    return;
  }
  backdrop.classList.add('is-hidden');
  removeAllEventListenersModal();
}

function removeAllEventListenersModal() {
  closeBtn.removeEventListener('click', onCloseBtnClick);
  window.removeEventListener('keydown', onKeydownEscape);
  backdrop.removeEventListener('click', onBackdropClick);
}

cardModal.addEventListener('click', clickOnMovieHandler);

let movieId;
// клик
function clickOnMovieHandler(e) {
  e.preventDefault();

  backdrop.classList.remove('is-hidden');
  if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H2') {
    return;
  }

  movieId = e.target.dataset.id;

  fetchById(movieId);

  addAllEventListenersModal();
  clearFilmCard();
}

//Фетч фильма по ID
function fetchById(movieId) {
  const idURL = `${ID_URL}${movieId}?api_key=${API_KEY}&language=en-US`;
  getMovies(idURL).then(res => {
    renderFilmCard(res);
    backdrop.setAttribute('id', movieId);
  });
}

function renderFilmCard(film) {
  modalFilmCart(film);
}

function clearFilmCard() {
  imgContainer.innerHTML = '';
}

const getGenresNames = genres => genres.map(genre => genre.name).join(', ');

function modalFilmCart({
  title,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
  poster_path,
}) {
  const markup = `
      <div class="image-container">
    <img 
    src="${BASE_IMG_URL}${poster_path}"
      alt="${title} movie poster}" 
      width="240" height="357" 
      class="image"
      />
    </div>
    <div class="content">
    <h2 class="title">${title}</h2>
    <div class="properties">
      <div class="titles">
          <p class="property">Vote / Votes</p>
          <p class="property">Popularity</p>
          <p class="property">Original Title</p>
          <p class="property">Genre</p>
      </div>
      <div class="values">
          <p class="value"><span class="first-mark">${vote_average}</span>&nbsp;/&nbsp;<span class="second-mark">${vote_count}</span></p>
          <p class="value">${popularity}</p>
          <p class="value">${original_title}</p>
          <p class="value">${getGenresNames(genres)}</p>
          
      </div>
    </div>
    <div class="about">
      <p class="title">About</p>
      <div class="about-container">
          <p class="text">${overview}</p>
          
          </div>
            </div>
            <div class="buttons">
                <button class="button to-watched">add to Watched</button>
                <button class="button to-queue">add to queue</button>
            </div>
        </div>
    </div>
      `;

  imgContainer.insertAdjacentHTML('afterbegin', markup);
}
