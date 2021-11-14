import { get, post } from "./api/api.js";
import { createCommentToPost, createPostComents } from "./dom.js";
import { showHomePage } from "./homePage.js";

export async function postDetails(postId) {
    
    document.querySelector('nav ul li a').addEventListener('click', backToPosts);
    document.querySelector('main').style.display = 'none';

    let [details, comments] = await Promise.all([
        await get('/jsonstore/collections/myboard/posts/' + postId),
        await get('/jsonstore/collections/myboard/comments')
    ]);
    
    comments = Object.values(comments).filter(c => c.postId == postId);

    document.querySelector('.container').appendChild(createPostComents(details, comments))
    
    const commentForm = document.querySelector('.answer form');
    document.querySelector('.answer button').addEventListener('click', addComment);

    async function addComment(e) {
        e.preventDefault();
        const formData = new FormData(commentForm);
        const commentData = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});
        
        if (Object.values(commentData).some(v => v == '')) {
            alert('Fill all fields!')
        } else {
            commentData.postId = postId;
            const c = await post('/jsonstore/collections/myboard/comments', commentData);
            const cmts =  document.querySelector('.theme-name');
            cmts.appendChild(createCommentToPost(c));

            commentForm.reset();
            
        }
    }
}

function backToPosts() {
    document.querySelector('.theme-content').remove();
    showHomePage()
} 
