
import signupPages from '../support/pages/signup'

//import { faker } from '@faker-js/faker' 
// const email    = faker.internet.email()

describe('cadastro', () => {

    before(function () {
        cy.fixture('signup').then(function (signup) {
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('quando o usuario é novato', function () {
        before(function () {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {
            signupPages.go()
            signupPages.form(this.success)
            signupPages.submit()
            signupPages.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        });
    });

    context('quando o email já existe', function () {


        before(function () {
            cy.postUser(this.email_dup)
        });
        it('deve exibir e-mail já cadastrado', function () {
            signupPages.go()
            signupPages.form(this.email_dup)
            signupPages.submit()
            signupPages.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        });
    });

    context('quando o email é inválido', function () {

        it('deve exibir mensagem de alerta', function () {
            signupPages.go()
            signupPages.form(this.email_inv)
            signupPages.submit()
            signupPages.alert.haveText('Informe um email válido')

        });
    });

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPages.go()
        });

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, function () {

                this.short_password.password = p

                signupPages.form(this.short_password)
                signupPages.submit()
            })
        })

        afterEach(function () {
            signupPages.alert.haveText('Pelo menos 6 caracteres',)
        })
    })

    context('quando não preencho nenhum dos campos ', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória',
        ]

        before(function () {
            signupPages.go()
            signupPages.submit()
        })
        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPages.alert.haveText(alert)
            });

        })
    });
})

