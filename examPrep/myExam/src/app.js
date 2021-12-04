import { getUserData, logout } from "./apiData/data.js";
import { page, render } from "./lib.js";
import { allPage } from "./views/all.js";
import { homePage } from "./views/home.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { editPage } from "./views/edit.js";
import { searchPage } from "./views/search.js";

const root = document.querySelector('main');
const navBtns = document.querySelectorAll('li')
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/all', allPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/search', searchPage);


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
        [...navBtns].map(b => b.className.includes('user') ? b.style.display = 'inline-block' : b.style.display = 'none');
    } else {
        [...navBtns].map(b => b.className.includes('guest') ? b.style.display = 'inline-block' : b.style.display = 'none');
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}
