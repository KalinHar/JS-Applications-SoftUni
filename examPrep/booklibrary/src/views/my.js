import { getMy, getUserData } from "../apiData/data.js";
import { html } from "../lib.js";

const myTempl = (items) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${items.length == 0
        ? html`<p class="no-books">No books in database!</p>`
        : html`<ul class="my-books-list">${items.map(card)}</ul>`}

</section>`;

const card = (item) => html`
<li class="otherBooks">
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src=${item.imageUrl}></p>
    <a class="button" href="/details/${item._id}">Details</a>
</li>`;

export async function myPage(ctx) {
    const items = await getMy();

    ctx.render(myTempl(items));
}