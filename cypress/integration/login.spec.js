import loginPage from "../support/pages/login";
import dashPage from "../support/pages/dash";

describe('login', () => {
    context('quando o usuario é muito bom', () => {

        const user = {
            name: 'Luiz fernado',
            email: 'Luizteste@teste.com',
            password: '123456',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)

        });

        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)

        });
    });

    context('quando o usuário é bom mas a senha esta incorreta', () => {

        let user = {
            name: 'Lucas Santos',
            email: 'lucas@santos.com',
            password: '123456',
            is_provider: true
        }

        before(() => {
            cy.postUser(user).then(function () {
                user.password = 'abc123'
            })

        });

        it('deve notificar erro de credenciais', () => {

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            loginPage.toast.shouldHaveText(message)
        });
    });

    context('quando o formato do email é inválido', () => {

        before(() => {
            loginPage.go()
        });

        const emails = ['andre.com.br', 'gmai.com', '@gmail.com', '@', 'andre@', '111', '$***7&', 'xpto123']

        emails.forEach(function (email) {
            it('não deve logar com o email: ' + email, () => {

                const user = { email: email, password: '123456' }


                loginPage.form(user)
                loginPage.submit()
                loginPage.alertHaveText('Informe um email válido')

            });
        })

    });

    context('quando não preencho nenhum dos campos ', () => {

        const alertMessages = [

            'E-mail é obrigatório',
            'Senha é obrigatória',
        ]

        before(function () {
            loginPage.go()
            loginPage.submit()
        })
        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                loginPage.alertHaveText(alert)
            });
        })
    });
});