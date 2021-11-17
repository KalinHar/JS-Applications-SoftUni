import { render } from './apiU.js'
import { showCatalog } from './catalog.js';
import { showCreate } from './create.js';
import { showUpdate } from './update.js';

const root = document.body;

startView();

export async function startView() {
    render([
        await showCatalog(),
        await showCreate()
    ], root); 
}

export  async function editView(book) {
    render([
        await showCatalog(),
        await showUpdate(book)
    ], root); 
}
