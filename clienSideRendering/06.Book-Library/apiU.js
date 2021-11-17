import { html, render } from './node_modules/lit-html/lit-html.js';

export {
    html,
    render,
    getBooks,
    createBook,
    updateBook,
    deleteBook
};

const host = 'http://localhost:3030';
async function request(url, method='get', data) {
    const options = {
        method,
        headers: {}
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'aplication/json';
        options.body = JSON.stringify(data);
    }
    const res = await fetch(host + url, options);
    if (res.ok == false) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const result = await res.json()
    return result;
}

async function getBooks() {
    return request('/jsonstore/collections/books');
}

async function createBook(book) {
    return request('/jsonstore/collections/books', 'post', book);
}

async function updateBook(id, book) {
    return request('/jsonstore/collections/books/' + id, 'put', book);
}

async function deleteBook(id) {
    return request('/jsonstore/collections/books/' + id, 'delete');
}