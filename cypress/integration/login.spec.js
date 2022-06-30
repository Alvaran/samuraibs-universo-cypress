import loginPage from "../support/pages/login";
import dashPage from "../support/pages/dash";

describe('login', () => {
    context('quando o usuario é muito bom', () => {

        const user = {
            name: 'Luiz fernado',
            email: 'Luizteste@teste.com',
            password: '123456'
        }
        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
            
        });
    });
});