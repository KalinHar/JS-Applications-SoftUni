import { html, render } from "./node_modules/lit-html/lit-html.js";
import { styleMap } from "./node_modules/lit-html/directives/style-map.js";
import { cats } from './catSeeder.js';

const catTempl = (cat, onDetails) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${()=> onDetails(cat)}>${cat.details ? 'Hide' : 'Show'} status code</button>
        <div class="status" style=${styleMap({display: cat.details ? 'block' : 'none'})} id=${cat.statusCode}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>`;
const catsTemp = (cats) => html`<ul>${cats.map(c => catTempl(c, onDetails))}</ul>`

const conteiner = document.querySelector('#allCats')

render(catsTemp(cats), conteiner);

function onDetails(cat) {
    cat.details = !cat.details;
    render(catsTemp(cats), conteiner);
}