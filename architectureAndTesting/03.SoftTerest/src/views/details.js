import { deleteById, getById } from '../api/data.js';
import { e } from '../dom.js';

const section = document.getElementById('detailsPage');
section.remove();
let ctx = null;

export async function showDetailsPage(ctxTarget, id) {
    ctx = ctxTarget;
    ctx.showSection(section);
    loadIdea(id)
}

async function loadIdea(id) {
    
    const idea = await getById(id);
    section.innerHTML = `
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>`;
    
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData && userData.id == idea._ownerId) {
        section.innerHTML += `<div class="text-center">
        <a class="btn detb" href="">Delete</a>
        </div>`;
        section.querySelector('.text-center').addEventListener('click', onDelete);
    }

    async function onDelete(ev) {
        ev.preventDefault();
        const confirmed = confirm('Comfirm deleting this idea?');
        if (confirmed) {
            await deleteById(idea._id)
            ctx.goTo('catalog');
        }
    }
}
