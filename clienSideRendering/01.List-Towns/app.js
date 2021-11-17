import { html, render } from "./node_modules/lit-html/lit-html.js";

const townsTemplate = (towns) => html`
<ul>
    ${towns.map(t => html`<li>${t}</li>`)}
</ul>`;

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
const container = document.querySelector('#root');

function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const towns = formData.get('towns').split(', ')

    render(townsTemplate(towns), container);

    form.reset();
}