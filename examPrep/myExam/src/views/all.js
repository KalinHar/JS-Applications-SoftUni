import { getAll, getUserData } from "../apiData/data.js";
import { html } from "../lib.js";

const allTempl = (items) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${items.length == 0
        ? html`<p>No Albums in Catalog!</p>`
        : items.map(card)}

</section>`;

const card = (item) => html`
<div class="card-box">
    <img src=${item.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        ${getUserData() == null
            ? null
            : html`<div class="btn-group">
                      <a href="/details/${item._id}" id="details">Details</a>
                   </div>`}
    </div>
</div>`;

export async function allPage(ctx) {

    const items = await getAll();

    ctx.render(allTempl(items));
}