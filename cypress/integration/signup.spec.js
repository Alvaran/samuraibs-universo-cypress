
import signupPages from '../support/pages/signup'

//import { faker } from '@faker-js/faker' 
// const email    = faker.internet.email()

describe('cadastro', () => {

    context('quando o usuario é novato', () => {
        const user = {
            name: 'André Luizs',
            email: 'andreteste@teste.com',
            password: '123456'
        }

        before(() => {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        });

        it('deve cadastrar com sucesso', () => {
            signupPages.go()
            signupPages.form(user)
            signupPages.submit()
            signupPages.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        });
    });

    context('quando o email já existe', () => {
        const user = {
            name: 'Pedro Luiz',
            email: 'pedro@teste.com',
            password: '123456',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
        });
        it('deve exibir e-mail já cadastrado', () => {
            signupPages.go()
            signupPages.form(user)
            signupPages.submit()
            signupPages.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        });
    });

    context('quando o email é inválido', () => {
        const user = {
            name: 'carlos bastos',
            email: 'carlos.uol.com',
            password: '123456',
        }

        it('deve exibir mensagem de alerta', () => {
            signupPages.go()
            signupPages.form(user)
            signupPages.submit()
            signupPages.alert.haveText('Informe um email válido')

        });
    });

    context('quando a senha é muito curta', () => {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(() => {
            signupPages.go()
        });

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, () => {

                const user = { name: 'Tereza bastoss', email: 'aloisio@hotmail.com', password: p }

                signupPages.form(user)
                signupPages.submit()
            })
        })

        afterEach(function () {
            signupPages.alert.haveText('Pelo menos 6 caracteres',)
        })
    })

    context('quando não preencho nenhum dos campos ', () => {

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
            it('deve exibir ' + alert.toLowerCase(),function() {
                signupPages.alert.haveText(alert)
            });

        })
    });
})

