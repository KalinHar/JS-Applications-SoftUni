import { showHome } from './home.js';
import { showLogin } from './login.js';
import { showRgister } from './register.js';
// import { showDetails } from './details.js';
// import { showCreate } from './create.js';

const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRgister
}
document.querySelector('#logoutBtn').addEventListener('click', onLogout);
const nav = document.querySelector('nav');
nav.addEventListener('click', (ev) => {
    const view = views[ev.target.id];
    if (typeof view == 'function') {
        ev.preventDefault();
        view();
    }
})

updateNav();
showHome();

export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    }else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}

async function onLogout (ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    const {token} = JSON.parse(sessionStorage.getItem('userData'));

    await fetch('http://localhost:3030/users/logout', {
        headers: {'X-Authorization': token}
    });
    sessionStorage.removeItem('userData');
    updateNav();
    showHome();
}
