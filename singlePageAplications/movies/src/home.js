import { showCreate } from './create.js';
import { showDetails } from './details.js';
import { e, showView } from './dom.js';

let moviesCache = null;
// let lastLoaded = null;
// const maxTime = 60000;  // one minute for loaded movies cache

const section = document.querySelector('#home-page');
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center');
const createMovieBtn  = section.querySelector('#createLink');
createMovieBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (sessionStorage.getItem('userData') != null){
        showCreate();
    }
})

catalog.addEventListener('click', (ev) => {
    ev.preventDefault();
    let target = ev.target;
    if (target.tagName == 'BUTTON') {
        target = target.parentElement;
    }
    if (target.tagName == 'A') {
        const id = target.dataset.id;
        showDetails(id);
    }
});
section.remove();

export function showHome() {
    showView(section);
    getMovies();
}

async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading...'))

    // const now = Date.now();
    // if (moviesCache == null || (now - lastLoaded) > maxTime) {
    //     lastLoaded = Date.now;

    const res = await fetch('http://localhost:3030/data/movies');
    const data = await res.json();
    moviesCache = data;
    // }

    catalog.replaceChildren(...moviesCache.map(createMovieCard))
}

function createMovieCard(movie) {
    const element = e('div', {className: 'card mb-4'});
    element.innerHTML = `
<img class="card-img-top" src="${movie.img}"
    alt="Card image cap" width="400">
<div class="card-body">
   <h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
   <a data-id=${movie._id} href="#">
       <button type="button" class="btn btn-info">Details</button>
   </a>
</div>`;

    return element;
}