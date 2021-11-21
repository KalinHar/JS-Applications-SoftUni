import { deleteById, getById, getUserData } from "../api/data.js";
import { html } from "../lib.js";

const detailsTempl = (itemDetails, isOwner, onDelete) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${itemDetails.img}/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${itemDetails.make}</span></p>
        <p>Model: <span>${itemDetails.model}</span></p>
        <p>Year: <span>${itemDetails.year}</span></p>
        <p>Description: <span>${itemDetails.description}</span></p>
        <p>Price: <span>${itemDetails.price}</span></p>
        <p>Material: <span>${itemDetails.material}</span></p>
        <div style="display: ${isOwner ? 'block' : 'none'}">
            <a href="/edit/${itemDetails._id}" class="btn btn-info">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} class="btn btn-red">Delete</a>
        </div>
    </div>
</div>`;

export async function detailsPage(ctx) {
    const itemDetails = await getById(ctx.params.id);
    // correct image path:
    itemDetails.img = itemDetails.img[0] == '.' ? itemDetails.img.slice(1) : itemDetails.img;
    
    const userId = getUserData() ? getUserData().id : 'NoId';
    const isOwner = itemDetails._ownerId == userId ? true : false;
    ctx.render(detailsTempl(itemDetails, isOwner,onDelete));

    async function onDelete() {
        await deleteById(itemDetails._id);
        ctx.page.redirect('/');
    }
}
