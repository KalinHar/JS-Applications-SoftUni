import { createItem } from "../api/data.js";
import { html } from "../lib.js";

const createTempl = (onSubmit, missingData) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control valid" + (missingData.make ? ' is-invalid error' : '')} placeholder=${missingData.make} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${"form-control" + (missingData.model ? ' is-invalid error' : '')} placeholder=${missingData.model} id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (missingData.year ? ' is-invalid error' : '')} placeholder=${missingData.year} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (missingData.description ? ' is-invalid error' : '')} placeholder=${missingData.description} id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (missingData.price ? ' is-invalid error' : '')} placeholder=${missingData.price} id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (missingData.img ? ' is-invalid error' : '')} placeholder=${missingData.img} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

export function createPage(ctx) {
    ctx.render(createTempl(onSubmit, {}));


    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = [...(new FormData(ev.target)).entries()];
        const data = formData.reduce((a, [k, v]) => Object.assign(a, {[k]: v.trim()}), {});

        const missingData = {};
      
        if (data.img == '') {
            missingData.img = 'Image URL!';
        }
        if (data.make.length < 4) {
            missingData.make = 'At least 4 symbols!';
        }
        if (data.model.length < 4) {
            missingData.model = 'At least 4 symbols!';
        }
        if (data.description.length <= 10) {
            missingData.description = 'At least 10 symbols!';
        }
        data.year = Number(data.year);
        data.price = Number(data.price);
        if (data.year < 1950 || data.year > 2050) {
            missingData.year = 'Between 1950 and 2050!';
        }
        if (data.price <= 0) {
            missingData.price = 'Positive number!';
        }
        if (Object.keys(missingData).length == 0) {
            await createItem(data);
            ctx.page.redirect('/');
        }else {
            ctx.render(createTempl(onSubmit, missingData));
        }
        
    }
}
