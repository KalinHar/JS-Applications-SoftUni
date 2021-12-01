import { login } from "../apiData/api.js";
import { html } from "../lib.js";

const loginTempl = (onClick) => html`
<section id="login-page" class="auth">
    <form id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input @click=${onClick} type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export function loginPage(ctx) {
    ctx.render(loginTempl(onClick));

    async function onClick(ev) {
        ev.preventDefault();

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#login-password').value;

        if (email == '' || password == '') {
            return alert("Fill all fields!");
        }

        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}
