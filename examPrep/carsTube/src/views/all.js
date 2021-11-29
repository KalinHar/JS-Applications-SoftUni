import { getAll } from "../apiData/data.js";
import { html } from "../lib.js";

const allTempl = (items) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        <!-- Display all records if there are-->
        ${items.length == 0
            ? html`<p class="no-cars">No cars in database.</p>`
            : items.map(card)}
    </div>
</section>`;

const card = (item) => html`
<div class="listing">
    <div class="preview">
        <img src=${item.imageUrl}>
    </div>
    <h2>${item.brand} ${item.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${item.year}</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${item._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function allPage(ctx) {
    const items = await getAll();
    ctx.render(allTempl(items));
}