import { getSearched, getUserData } from "../apiData/data.js";
import { html } from "../lib.js";

const searchTempl = (items, onSearch, params='') => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${params}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        <!--If have matches-->
        ${items.length == 0
            ? html`<p class="no-result">No result.</p>`
            : items.map(card)}

    </div>
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

export async function searchPage(ctx) {
    const params = ctx.querystring.split('=')[1]
    let items = [];
    if (params) {
        items = await getSearched(decodeURIComponent(params));
    }

    ctx.render(searchTempl(items, onSearch, params));

    function onSearch() {
        // ev.preventDefault();

        let text = document.querySelector('#search-input').value;
        text = text.trim();

        if (text) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(text));
        } else {
            return alert("Fill search field!");
        }


    }

}