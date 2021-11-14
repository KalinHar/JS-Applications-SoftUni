import { showDetails } from './details.js';
import { showView } from './dom.js';

let edMovie = undefined;
const section = document.querySelector('#edit-movie');
const form = section.querySelector('form');
form.addEventListener('submit', editMovie);
section.remove();

export async function showEdit(movie) {
    edMovie = movie;
    const [title, description, img] = section.querySelectorAll('.form-control');  
    title.value = edMovie.title;
    description.value = edMovie.description;
    img.value = edMovie.img;
    showView(section);
}

async function editMovie(ev) {
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
        const res = await fetch('http://localhost:3030/data/movies/' + edMovie._id, {
            method: 'put',
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
        showDetails(edMovie._id);

    }catch (err){
        alert(err.message);
    }
}

