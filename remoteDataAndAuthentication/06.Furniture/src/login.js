const form = document.querySelector('form');
form.addEventListener('submit', onLogin);

async function onLogin(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');
    console.log(email, password)
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
        console.log(user);
        const userData = {
            id: user._id,
            email: user.email,
            token: user.accessToken
        }
        localStorage.setItem('data', JSON.stringify(userData));
        window.location = './home.html';
    }catch (err) {
        alert(err.message);
    }
}