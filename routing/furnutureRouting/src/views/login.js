import { login } from "../api/data.js";
import { html } from "../lib.js";


const loginTempl = (onSubmit, errorMsg) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p class=${errorMsg ? 'error' : ''}>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${"form-control" + (errorMsg ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (errorMsg ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;

export function loginPage(ctx) {
    ctx.render(loginTempl(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const pasword = formData.get('password').trim();

        try {
            await login(email, pasword);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (err) {
            ctx.render(loginTempl(onSubmit, err.message));
        }
    }
}
