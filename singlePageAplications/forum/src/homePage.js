import { get } from "./api/api.js";
import { createDivPost } from "./dom.js";

export async function showHomePage() {

    document.querySelector('main').style.display = 'block';
    const postConteiner = document.querySelector('.topic-container');
    postConteiner.replaceChildren();
    const allPosts = await get('/jsonstore/collections/myboard/posts');
    Object.values(allPosts).forEach(p => postConteiner.appendChild(createDivPost(p)));
}
