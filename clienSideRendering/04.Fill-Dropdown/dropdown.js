import { html, render } from "../node_modules/lit-html/lit-html.js";

const dropMenu = document.querySelector('div');
const destins = await getDestinations();
const menu = (dest) => html`
<select id="menu">
    ${dest.map(d => html`<option value=${d._id}>${d.text}</option>`)}
</select>`;

const form = document.querySelector('form');
form.addEventListener('submit', addDEstination);

update();
function update() {
    render(menu(destins), dropMenu);
}

async function addDEstination(e) {
    e.preventDefault();
    const textField = document.querySelector('#itemText');
    const text = textField.value.trim();
    if (text != '') {  
        destins.push(await postDestination(text));
        update();
    }
    textField.value = '';
}

async function postDestination(text) {
    const res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text})
    });
    const destination = await res.json();
    return destination;
}

async function getDestinations() {
    const res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    const destinations = await res.json();
    return Object.values(destinations);
}
