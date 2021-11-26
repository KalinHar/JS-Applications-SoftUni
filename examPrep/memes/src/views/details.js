import { deleteById, getById, getUserData } from "../apiData/data.js";
import { html } from "../lib.js";

const detailsTempl = (meme, onDelete, isOwner) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>
            ${isOwner
                ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
                       <button @click=${onDelete} class="button danger">Delete</button>`
                : null}            
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const meme = await getById(ctx.params.id);

    const user = getUserData();
    const isOwner = user && user.id == meme._ownerId;

    ctx.render(detailsTempl(meme, onDelete, isOwner));

    async function onDelete() {
        const confirmed = confirm('Are you sure to delete this meme?');
        if (confirmed) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/allMemes');
        }

    }

}