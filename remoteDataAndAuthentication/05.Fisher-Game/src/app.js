let userData = null;
let table = null;
window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(localStorage.getItem('data'));

    if (userData != null) {
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#addForm button').disabled = false;
        document.querySelector('.email span').textContent = userData.email;

    } else {
        document.querySelector('#user').style.display = 'none'
    }
    document.querySelector('#addForm').addEventListener('submit', onCreateCatch);
    document.querySelector('.load').addEventListener('click', loadData);
    document.querySelector('#user').addEventListener('click', toLogout);
    table = document.querySelector('#catches');
    table.addEventListener('click', onCatches);
    document.querySelector('#home').addEventListener('click', () => {
        table.innerHTML = '<div>Click on "LOAD" to view catches!</div>';
    })
});

async function toLogout() {
    try {
        const res = await fetch('http://localhost:3030/users/logout', {
            headers: {'X-Authorization': userData.token}
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        localStorage.clear();
        window.location = './login.html';
    }catch (err) {
        alert(err.message);
    }
}

async function editCatch(catchId, el) {
    const [angler, weight,species, location, bait, captureTime] = Array.from(el.querySelectorAll('input')).map(e => e.value.trim());
    try {
        if ([angler, weight,species, location, bait, captureTime].some(v => v == '')) {
            throw new Error('Fill in all fields!')
        }
        const editData = {angler, weight, species, location, bait, captureTime}
        const res = await fetch('http://localhost:3030/data/catches/' + catchId, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(editData)
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        alert('Updated Successfully!');
        loadData();
    }catch (err) {
        alert(err.message);
    }
}

async function deleteCatch(catchId, el) {
    try {
        const res = await fetch('http://localhost:3030/data/catches/' + catchId, {
            method: 'delete',
            headers: {
                'X-Authorization': userData.token
            }
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message)
        }
        el.remove();
    } catch (err) {
        alert(err.message);
    }
}

function onCatches(e) {
    const btn = e.target;
    if (btn.className == 'delete') {
        deleteCatch(btn.dataset.id, btn.parentElement);  
    }else if (btn.className == 'update') {
        editCatch(btn.dataset.id, btn.parentElement);
    }
}

async function onCreateCatch(e) {
    e.preventDefault();
    if (!userData) {
        window.location = './login.html';
        return;
    }
    const formData = new FormData(e.target);
    const catchData = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {[k]:v}), {});
    try {
        if (Object.values(catchData).some(v => v == '')) {
            throw new Error('Fill in all fields!')
        }
        const res = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(catchData)
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        e.target.reset();
        loadData();
    }catch (err) {
        alert(err.message);
    }
}

async function loadData() {
    const res = await fetch('http://localhost:3030/data/catches');
    const data = await res.json();

    table.innerHTML = '';
    data.map(createRecord);
}

async function createRecord(rec) {
    const field = document.createElement('div');
    field.className = 'catch';
    field.innerHTML = `<label>Angler</label>
<input type="text" class="angler" value="${rec.angler}">
<label>Weight</label>
<input type="text" class="weight" value="${rec.weight}">
<label>Species</label>
<input type="text" class="species" value="${rec.species}">
<label>Location</label>
<input type="text" class="location" value="${rec.location}">
<label>Bait</label>
<input type="text" class="bait" value="${rec.bait}">
<label>Capture Time</label>
<input type="number" class="captureTime" value="${rec.captureTime}">
<button class="update" data-id="${rec._id}">Update</button>
<button class="delete" data-id="${rec._id}">Delete</button>`;
    table.appendChild(field);

    const isOwner = (userData && rec._ownerId == userData.id);
    Array.from(field.children).map(el => el.disabled = isOwner ? false : true);
}