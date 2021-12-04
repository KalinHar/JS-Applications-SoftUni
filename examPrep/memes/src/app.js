import { getUserData, logout } from "./apiData/data.js";
import { page, render } from "./lib.js";
import { allMemesPage } from "./views/allMemes.js";
import { homePage } from "./views/home.js";
import { profilPage } from "./views/profil.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { editPage } from "./views/update.js";

const root = document.querySelector('main');
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/allMemes', allMemesPage);
page('/login', loginPage);
page('/register', registerPage);
page('/profile', profilPage);


updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content => render(content, root));
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const user = getUserData();
    if (user) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome ${user.email}`;             
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}
