const url = 'http://localhost:3030/jsonstore/collections/books';
const createForm = document.getElementById('createForm');
const editForm = document.getElementById('editForm');
editForm.style.display = 'none';
const loadBtn = document.querySelector('#loadBooks')
const table = document.querySelector('tbody');

loadBtn.addEventListener('click', loadBooks);
createForm.addEventListener('submit', submitBook);
editForm.addEventListener('submit', editBook);

function renderBook(id, title, author) {
    const row = document.createElement('tr');
    row.id = id;
    row.innerHTML = `<td>${title}</td>
    <td>${author}</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>`;
    table.appendChild(row);
    const [edB, deB] = Array.from(row.querySelectorAll('button'));
    edB.addEventListener('click', toEditForm);
    deB.addEventListener('click', dellBook);
}

async function loadBooks() {
    table.replaceChildren();
    const res = await fetch(url);
    const data = await res.json();
    for (let key in data) {
        renderBook(key, data[key].title, data[key].author);
    }
}

async function submitBook(e) {
    e.preventDefault();
    const data = new FormData(createForm);
    const author = data.get('author').trim();
    const title = data.get('title').trim();
    if (author != '' && title != '') {
        const book = { author, title }
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        }
        try {
            const res = await fetch(url, options);
            if (res.ok != true) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            createForm.reset();
            renderBook(data._id, data.title, data.author)
            console.log(data);

        } catch (err) {
            alert(err);
        }
    }
}

function toEditForm(e) {
    const row = e.target.parentElement.parentElement;

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.dataset.id = row.id;
    editForm.querySelector('[name="author"]').value = row.children[0].textContent;
    editForm.querySelector('[name="title"]').value = row.children[1].textContent;
}

async function editBook(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    const data = new FormData(editForm);
    const author = data.get('author').trim();
    const title = data.get('title').trim();
    
    if (author != '' && title != '') {
        const book = { author, title }
        const options = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        }
        const res = await fetch(url + '/' + id, options);
        const result = await res.json();
        e.target.reset();
        createForm.style.display = 'block';
        editForm.style.display = 'none';
        loadBooks();
        return result;
    }
}

async function dellBook(e) {
    const row = e.target.parentElement.parentElement;
    try {
        const res = await fetch(url + '/' + row.id, { method: 'delete' });
        if (res.ok != true) {
            throw new Error(res.statusText);
        }
        const result = await res.json();
        row.remove();
    } catch (err) {
        alert(err)
    }
}
loadBooks();