import { getAll } from "../apiData/data.js";
import { html } from "../lib.js";

const allTempl = (items) => html`
        <section id="catalog-page">
            <h1>All Games</h1>
            <!-- Display div: with information about every game (if any) -->
            ${items.length == 0
            ? html`<h3 class="no-articles">No articles yet</h3>`
            : items.map(gameCard)}
        </section>`;

const gameCard = (item) => html`
            <div class="allGames">
                <div class="allGames-info">
                    <img src=${item.imageUrl}>
                    <h6>${item.category}</h6>
                    <h2>${item.title}</h2>
                    <a href="/details/${item._id}" class="details-button">Details</a>
                </div>
            </div>`;

export async function allPage(ctx) {
    const items = await getAll();

    ctx.render(allTempl(items));
}