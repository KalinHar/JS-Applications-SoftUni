function solution() {
    
    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(res => res.json())
        .then(data => postData(data));
        
    function postData(data) {
        const main = document.querySelector('#main');
        data.forEach(e => {
            const divEl = document.createElement('div');
            divEl.className = "accordion";
            divEl.innerHTML = `<div class="head">
<span>${e.title}</span>
<button class="button" id=${e._id}>More</button>
</div>
<div class="extra">
<p></p>
</div>`;
            main.appendChild(divEl);
            divEl.querySelector(`.button`).addEventListener('click', toggle);
        });
    }
    async function toggle(e) {
        const btn = e.target;
        if (btn.textContent == 'More') {
            btn.textContent = 'Loading...';
            btn.disabled = true;
            if (btn.parentElement.nextElementSibling.children[0].textContent == '') {
                const r = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${btn.id}`);
                const data = await r.json();
                btn.parentElement.nextElementSibling.children[0].textContent = data.content;
            }
            btn.parentElement.nextElementSibling.style.display = 'block';
            btn.textContent = 'Less';
            btn.disabled = false;
        } else {
            btn.textContent = 'More';
            btn.parentElement.nextElementSibling.style.display = 'none';
        }
    }
}

solution();