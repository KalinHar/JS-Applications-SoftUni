import { createBook, html } from "./apiU.js";
import { startView } from "./app.js";

const createTemp = () => html`
<form @submit=${onCreate} id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`;

export function showCreate() {
    return createTemp();
}

async function onCreate(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const title = formData.get('title').trim();
    const author = formData.get('author').trim();

    await createBook( { title, author });
    ev.target.reset();
    startView();
}