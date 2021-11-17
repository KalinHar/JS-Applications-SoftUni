import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from './towns.js';

let chars;

const townsTemplate = (towns) => html`
<ul>
    ${towns.map(t => html`<li class=${t.toLowerCase().includes(chars) ? 'active' : ''}>${t}</li>`)}
</ul>`;

const conteiner = document.querySelector('#towns');

const [searchBtn, clearBtn] = document.querySelectorAll('button');
searchBtn.addEventListener('click', search);
clearBtn.addEventListener('click', clear);

const searchText = document.querySelector('#searchText');

const result = document.querySelector('#result');

update();

function update() {
   render(townsTemplate(towns), conteiner);
}

function clear() {
   searchText.value = '';
   chars = undefined;
   result.textContent = ``;
   update();
}

function search() {
   chars = searchText.value.toLowerCase();
   if (chars) {
      update();
   } 
   const count = conteiner.getElementsByClassName('active').length;
   result.textContent = `${count ? count : 'No'} matches found`;
}
