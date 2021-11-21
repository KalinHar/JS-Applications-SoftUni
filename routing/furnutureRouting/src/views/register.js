import { register } from "../api/data.js";
import { html } from "../lib.js";

const registerTempl = (onSubmit, errorMsg, errors) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p class=${errorMsg ? 'error' : ''}>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${"form-control" + (errors.email ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (errors.password ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${"form-control" + (errors.rePass ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;

export function registerPage(ctx) {
    ctx.render(registerTempl(onSubmit, null, {}));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const pasword = formData.get('password').trim();
        const rePass = formData.get('rePass').trim();

        try {
            if ( email == '' || pasword == '') {
                throw {
                    error: new Error('Fill all fields!'),
                    errors: {
                        email: email == '',
                        password: pasword == '',
                        rePass: rePass == ''
                    }
                }
            }

            if (pasword != rePass) {
                throw {
                    error: new Error('Passwords don\'t match!'),
                    errors: {
                        rePass: true,
                        password: true
                    }
                }
            }

            await register(email, pasword);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (err) {
            const msg = err.message || err.error.message;
            ctx.render(registerTempl(onSubmit, msg, err.errors || {}));
        }
    }
}