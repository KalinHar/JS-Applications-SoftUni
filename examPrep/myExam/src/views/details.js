import { deleteById, getById, getUserData } from "../apiData/data.js";
import { html } from "../lib.js";

const detailsTempl = (item, onDelete, isOwner) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${item.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${item.name}</h1>
                <h3>Artist: ${item.artist}</h3>
                <h4>Genre: ${item.genre}</h4>
                <h4>Price: $${item.price}</h4>
                <h4>Date: ${item.releaseDate}</h4>
                <p>Description: ${item.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${isOwner
                ? html`<div class="actionBtn">
                          <a href="/edit/${item._id}" class="edit">Edit</a>
                          <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                       </div>`
                : null}
            
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const item = await getById(ctx.params.id);
    console.log(item)

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