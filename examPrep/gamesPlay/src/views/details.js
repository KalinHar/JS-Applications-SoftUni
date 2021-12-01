import { createComment, deleteById, getById, getComments, getUserData } from "../apiData/data.js";
import { html } from "../lib.js";

const detailsTempl = (item, onDelete, isOwner, comments, user, addComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${item.imageUrl} />
            <h1>${item.title}</h1>
            <span class="levels">MaxLevel: ${item.maxLevel}</span>
            <p class="type">${item.category}</p>
        </div>

        <p class="text">${item.summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length == 0
                ? html`<p class="no-comment">No comments.</p>`
                : html`<ul>${comments.map(commentCard)}</ul>`}
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${isOwner
            ? html`
                <div class="buttons">
                    <a href="/edit/${item._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>`
            : null}
        
    </div>
    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${(user != null && !isOwner)
        ? html`
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${addComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>`
        : null}
    

</section>`;

const commentCard = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
    const [item, comments] = await Promise.all([
        getById(ctx.params.id),
        getComments(ctx.params.id)
    ]);

    const user = getUserData();
    const isOwner = user && user.id == item._ownerId;

    ctx.render(detailsTempl(item, onDelete, isOwner, comments, user, addComment));

    async function addComment(ev) {
        ev.preventDefault();
        
        const formData = new FormData(ev.target);
        const comment = formData.get('comment');
        await createComment({
            gameId: ctx.params.id,
            comment
        })
        ctx.page.redirect('/details/' + ctx.params.id)
    }

    async function onDelete() {
        const confirmed = confirm('Are you sure to delete this?');
        if (confirmed) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/');
        }

    }

}