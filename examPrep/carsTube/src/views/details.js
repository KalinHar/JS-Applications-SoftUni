import { deleteById, getById, getUserData } from "../apiData/data.js";
import { html } from "../lib.js";

const detailsTempl = (item, onDelete, isOwner) => html`
 <section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${item.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${item.brand}</li>
            <li><span>Model:</span>${item.model}</li>
            <li><span>Year:</span>${item.year}</li>
            <li><span>Price:</span>${item.price}$</li>
        </ul>

        <p class="description-para">${item.description}</p>
        ${isOwner
            ? html`<div class="listings-buttons">
                       <a href="/edit/${item._id}" class="button-list">Edit</a>
                       <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
                   </div>`
            : null}
        
    </div>
</section>`;

export async function detailsPage(ctx) {
    const item = await getById(ctx.params.id);

    const user = getUserData();
    const isOwner = user && user.id == item._ownerId;

    ctx.render(detailsTempl(item, onDelete, isOwner));

    async function onDelete() {
        const confirmed = confirm('Are you sure to delete this?');
        if (confirmed) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/all');
        }

    }

}