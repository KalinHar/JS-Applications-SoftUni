import { post } from "./api/api.js";
import { createDivPost } from "./dom.js";
import { showHomePage } from "./homePage.js";


showHomePage();
const postConteiner = document.querySelector('.topic-container');
const postForm = document.querySelector('.new-topic-border form');
postForm.addEventListener('submit', toPostFields);

function toPostFields(e) {
    e.preventDefault()
}

const [cancelBtn, postBth] = postForm.querySelectorAll('button');
cancelBtn.addEventListener('click', () => postForm.reset());
postBth.addEventListener('click', getPostFields);

function getPostFields(e) {
    e.preventDefault();
    const formData = new FormData(postForm);
    const postData = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

    publicPost(postData);
    postForm.reset()
}

async function publicPost(postData) {
    if (Object.values(postData).some(v => v == '')) {
        alert('Fill all fields!')
    } else {
        const p = await post('/jsonstore/collections/myboard/posts', postData);
        postConteiner.appendChild(createDivPost(p));
    }
}