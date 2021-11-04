userData = JSON.parse(localStorage.getItem('data'));
const form = document.querySelector('#productData');
form.addEventListener('submit', onCreateProduct);

async function onCreateProduct(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const productData = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {[k]:v}), {});
    try {
        if (Object.values(productData).some(v => v == '') || !(Number(formData.get('price')) > 0)) {
            throw new Error('Incorect value in fields!')
        }
        const res = await fetch('http://localhost:3030/data/furniture', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(productData)
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        form.reset();
        window.location = './home.html';
    }catch (err) {
        alert(err.message);
    }
}