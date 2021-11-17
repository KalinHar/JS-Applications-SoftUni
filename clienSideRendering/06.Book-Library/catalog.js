import { deleteBook, getBooks, html } from "./apiU.js";
import { editView, startView } from "./app.js";

const catalogTemp = (books) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${books.map(bookRow)}
    </tbody>
</table>`;

const bookRow = (book) => html`
<tr id=${book.id}>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button @click=${() => onEdit(book)}>Edit</button>
        <button @click=${() => onDelete(book.id)}>Delete</button>
    </td>
</tr>`;

export async function showCatalog() {
    const books = await getBooks();
    Object.entries(books).map(([k, v]) => v.id = k)
    return catalogTemp(Object.values(books));
}

function onEdit(book) {
    editView(book)
}

async function onDelete(id) {
    await deleteBook(id);
    startView();
}