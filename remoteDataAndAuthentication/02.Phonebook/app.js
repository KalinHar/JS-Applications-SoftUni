const url = 'http://localhost:3030/jsonstore/phonebook';
const phonebook  = document.getElementById('phonebook');
const person  = document.getElementById('person');
const phone  = document.getElementById('phone');

function attachEvents() {
    const createBtn  = document.getElementById('btnCreate');
    const loadBtn  = document.getElementById('btnLoad');
    loadBtn.addEventListener('click', loadPhonebook);
    createBtn.addEventListener('click', createContact);
    phonebook.addEventListener('click', dellContact);
}
async function loadPhonebook() {
    phonebook.innerHTML = '';
    const res = await fetch(url);
    const data = await res.json();
    Object.values(data).map(o => renderContact(o));
    
    return data;
}
async function createContact(){
    if (person.value.trim() != '' && phone.value.trim() != '') {
        const data = {
            person: person.value,
            phone: phone.value
        }
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    
        try {
            const res = await fetch(url, options);
            if (res.ok != true) {
                throw new Error(res.statusText);
            }
    
            const result = await res.json();
            renderContact(result);
            person.value = '';
            phone.value = '';
            return result;
        } catch (err) {
            alert(err);
        }
    }
}
async function dellContact(e) {
    const id = e.target.dataset.id;
    if (id) {
        try {
            const res = await fetch(url + '/' + id, { method:'delete'});
            if (res.ok != true) {
                throw new Error(res.statusText);
            }
            const result = await res.json();
            e.target.parentElement.remove();
            return result;
        }catch (err) {
            alert(err);
        }
    }
}
function renderContact(obj) {
    const li = document.createElement('li');
    li.innerHTML = `
${obj.person}: ${obj.phone}<button data-id="${obj._id}">Delete</button>`;
    phonebook.appendChild(li);
}

attachEvents();