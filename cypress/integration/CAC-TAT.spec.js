/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach (() => {
        cy.visit('./src/index.html')
        })
    it('Verifica o título da aplicação', () => {
        cy.visit('./src/index.html')
        cy.title().should('to.eq','Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Lívia')
        cy.get('#lastName').type('Marconi')
        cy.get('#email').type('naosei@gmail.com')
        cy.get('#open-text-area').type('Preciso de ajuda com o anexo.', {delay:0})
        cy.get('.button').click()
        cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        const longText = 'Lorem ipsum dolor sit amet. Qui placeat excepturi ut repudiandae rerum sit expedita rerum aut quia corporis est delectus necessitatibus sed veniam sint hic adipisci quos. In recusandae sunt ea dicta enim hic nihil odit'
        cy.get('#firstName').type('Lívia')
        cy.get('#lastName').type('Marconi')
        cy.get('#email').type('seila')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('.button').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })
    
    it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone').type('abcdefgijk').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Lívia')
        cy.get('#lastName').type('Marconi')
        cy.get('#email').type('naosei@gmail.com')
        cy.get('#open-text-area').type('Preciso de ajuda com o anexo.', {delay:0})
        cy.get('#phone-checkbox').check()
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Lívia').should('have.value', 'Lívia').clear().should('have.value', '')
        cy.get('#lastName').type('Marconi').should('have.value', 'Marconi').clear().should('have.value', '')
        cy.get('#email').type('naosei@gmail.com').should('have.value', 'naosei@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('11983242412').should('have.value', '11983242412').clear().should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })
    
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        })

    it('Seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    }) 
    
    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })
    
    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio) => {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.check')
        })
        
    })
    
    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().last().uncheck()
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Lívia')
        cy.get('#lastName').type('Marconi')
        cy.get('#email').type('naosei@gmail.com')
        cy.get('#open-text-area').type('Preciso de ajuda com o anexo.', {delay:0})
        cy.get('#phone-checkbox').check()
        cy.get('.button').click()
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!')
    })

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json')
    })

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success').should('not.be.visible').invoke('show').wait(2000).should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide').should('not.be.visible')
        cy.get('.error').should('not.be.visible').invoke('show').wait(2000).should('be.visible').and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide').should('not.be.visible')
    })
    
    it.only('Faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should((resposta) => {
            const{status, statusText, body} = resposta
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
       })
    })
})