import { showView } from './dom.js';
import { showHome } from './home.js';

const section = document.querySelector('#add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', createMovie);
section.remove();

export function showCreate() {
    showView(section);
}

async function createMovie(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageUrl').trim();
    const {token} = JSON.parse(sessionStorage.getItem('userData'));

    try {
        if (title == '' || description == '' || img == '') {
            throw new Error('Fill all fields!');
        }
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({title, description, img})
        });
        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        form.reset();
        showHome();

    }catch (err){
        alert(err.message);
    }
}