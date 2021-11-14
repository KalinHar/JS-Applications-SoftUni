import { postDetails } from "./postPage.js";

export function createDivPost(post) {
    const newPost = document.createElement('div');
    newPost.className = 'topic-name-wrapper';
    newPost.id = post._id;
    newPost.innerHTML = `<div class="topic-name">
<a href="#" class="normal">
<h2>${post.topicName}</h2>
</a>
<div class="columns">
<div>
<p>Date: <time>${post.currData}</time></p>
<div class="nick-name">
<p>Username: <span>${post.username}</span></p>
</div>
</div>
</div>
</div>`;
    newPost.querySelector('a').addEventListener('click', postView);
    return newPost;
}
function postView(e) {
    const postId = e.target.parentElement.parentElement.parentElement.id;
    postDetails(postId);
}

export function createPostComents(post, coments) {
    const postComent = document.createElement('div');
    postComent.className = 'theme-content'
    postComent.innerHTML = `
    <!-- theme-title  -->
    <div class="theme-title">
        <div class="theme-name-wrapper">
            <div class="theme-name">
                <h2>${post.topicName}</h2>
                <div class="comment">
                    <div class="header">
                        <img src="./static/profile.png" alt="avatar">
                        <p><span>${post.username}</span> posted on <time>${post.currData}</time></p>
                        <p class="post-content">${post.postText}</p>
                    </div>

            </div>

        </div>
    </div>

    <div class="answer-comment">
        <p><span>currentUser</span> comment:</p>
        <div class="answer">
            <form>
                <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                <div>
                    <label for="username">Username <span class="red">*</span></label>
                    <input type="text" name="username" id="username">
                </div>
                <button>Post</button>
            </form>
        </div>
    </div>`;
    
    const cmts =  postComent.querySelector('.theme-name');
    if (coments.length > 0) {
        coments.map(c => cmts.appendChild(createCommentToPost(c)));
    }
    return postComent;
}

export function createCommentToPost(c) {
    const el = document.createElement('div');
    el.className = 'comment';
    el.innerHTML = `
<p><span>${c.username}</span> commented on <time>${c.currData}</time></p>
<p class="post-content">${c.postText}</p>`;
    return el
}