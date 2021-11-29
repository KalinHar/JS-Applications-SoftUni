import { getSearched } from "../apiData/data.js";
import { html } from "../lib.js";

const searchTempl = (onSearch, items, params) => html`
<section id="search-cars">
            <h1>Filter by year</h1>
            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${params}>
                <button @click=${onSearch} class="button-list">Search</button>
            </div>
            <h2>Results:</h2>
            <div class="listings">
                <!-- Display all records if there are-->
                ${items.length == 0
                    ? html`<p class="no-cars"> No results.</p></p>`
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

export async function byYearPage(ctx) {
    const params = ctx.querystring.split('=')[1] || '';
    let items = [];
    if (params) {
        items = await getSearched(decodeURIComponent(params));
    }
    ctx.render(searchTempl(onSearch, items, params));

    function onSearch() {
        const text = document.querySelector('#search-input').value;
        if (text) {
            ctx.page.redirect('/byYear?query=' + encodeURIComponent(text));
        }
    }
    
}