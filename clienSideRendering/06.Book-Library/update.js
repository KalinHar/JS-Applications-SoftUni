import { html, updateBook } from "./apiU.js";
import { startView } from "./app.js";

const updateTemp = (book) => html`
<form @submit=${onUpdate} id="edit-form">
    <input type="hidden" name="id" .value=${book.id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>`;

export function showUpdate(book) {
    return updateTemp(book);
}

async function onUpdate(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const id = formData.get('id');
    const title = formData.get('title').trim();
    const author = formData.get('author').trim();

    await updateBook(id, { title, author });
    ev.target.reset();
    startView();
}