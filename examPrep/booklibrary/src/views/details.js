import { deleteById, getAllLikes, getById, getMyLikes, getUserData, makeLike } from "../apiData/data.js";
import { html } from "../lib.js";

const detailsTempl = (item, onDelete, isOwner, bookLikes, myLikes, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${item.title}</h3>
        <p class="type">Type: ${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${isOwner
                ? html`<a class="button" href="/edit/${item._id}">Edit</a>
                       <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
                : null}
            <!-- Bonus -->
            ${isOwner || myLikes
                ? null
                : html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${bookLikes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${item.description}</p>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const user = getUserData();

    const [item, bookLikes, myLikes] = await Promise.all([
        getById(ctx.params.id),
        getAllLikes(ctx.params.id),
        user ? getMyLikes(ctx.params.id, user.id) : 1
    ]);

    console.log(bookLikes, myLikes)

    const isOwner = user && user.id == item._ownerId;

    ctx.render(detailsTempl(item, onDelete, isOwner, bookLikes, myLikes, onLike));

    async function onDelete() {
        const confirmed = confirm('Are you sure to delete this?');
        if (confirmed) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        const b = await makeLike(ctx.params.id);
        console.log(b)
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}