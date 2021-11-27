import { getAll } from "../apiData/data.js";
import { html } from "../lib.js";

const allTempl = (items) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    ${items.length == 0
        ? html`<p class="no-books">No books in database!</p>`
        : html`<ul class="other-books-list">${items.map(card)}</ul>`}
</section>`;

const card = (item) => html`
<li class="otherBooks">
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href="/details/${item._id}">Details</a>
</li>`;

export async function allPage(ctx) {
    const items = await getAll();

    ctx.render(allTempl(items));
}