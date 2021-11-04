window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin);
    document.querySelector('#user').style.display = 'none';
    document.querySelector('#login').style.display = 'none';
});

async function onLogin(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const user = await res.json();
        const userData = {
            id: user._id,
            email: user.email,
            token: user.accessToken
        }
        localStorage.setItem('data', JSON.stringify(userData));
        window.location = './index.html';
    }catch (err) {
        alert(err.message);
    }
}