import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async evt => {
  evt.preventDefault();
  currentQuery = form.searchText.value.trim();
  if (!currentQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  await fetchAndRender();
  form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRender(true);
});

async function fetchAndRender(isLoadMore = false) {
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits, totalHits: total } = data;
    totalHits = total;
    if (hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }
    createGallery(hits);
    if (currentPage * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    if (isLoadMore) smoothScroll();
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery .gallery-item');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({
    top: 2 * height,
    behavior: 'smooth',
  });
}
