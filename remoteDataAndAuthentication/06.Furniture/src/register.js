let form = null;

form = document.querySelector('form');
form.addEventListener('submit', onRegForm);

async function onRegForm(e) {
    e.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('rePass').trim();
    console.log(email, password, rePass)
    try {
        if ([email, password, rePass].some(v => v == "")) {
            throw new Error('Fill in all fields!');
        }else if (!/\S+@\S+\.\S+/.test(email)) {
            throw new Error('Incorect email!');
        }else if (password.length < 3 || password != rePass) {
            throw new Error('Incorect Password!');
        }
        const res = await fetch('http://localhost:3030/users/register', {
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
        window.location = './home.html';
    } catch (err) {
        alert(err.message);
    }
}