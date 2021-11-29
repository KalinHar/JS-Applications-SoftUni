import { getById, updateThis } from "../apiData/data.js";
import { html } from "../lib.js";

const editTempl = (item, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${item.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${item.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${item.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${item.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${item.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${item.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function editPage(ctx) {
    const item = await getById(ctx.params.id);

    ctx.render(editTempl(item, onSubmit ));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const year = Number(formData.get('year').trim());
        const imageUrl = formData.get('imageUrl').trim();
        const price = Number(formData.get('price').trim());

        if (brand == '' || description == '' || imageUrl == '' || model == '') {
            return alert("Fill all fields!");
        }
        if (year < 1 || price < 1) {
            return alert("The price and year must be positive numbers!");
        }

        await updateThis({brand, model, description, year, imageUrl, price}, ctx.params.id);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    }
}