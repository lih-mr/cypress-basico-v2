/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function (){
        cy.visit('./src/index.html') //visitando arquivo local ou seja, que esteja no pc
    }) 

    it.only('Verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') 
    })

    it.only('Preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Lívia').click()
        cy.get('#lastName').type('Marconi da Rocha').click()
        cy.get('#email').type('liviamarconi31@gmail.com').click()
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Non mollitia veritatis est consectetur delectus ut blanditiis animi qui esse animi. Et laborum maiores ut soluta iusto et iusto blanditiis ut amet corrupti qui aliquid neque quo dolor fuga? Et maxime architecto quo omnis autem et labore consectetur.', { delay: 0}).click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success > strong').should('be.visible')
    })
    
    it.only('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Lívia').click()
        cy.get('#lastName').type('Marconi da Rocha').click()
        cy.get('#email').type('liviamarconi31@gmail,com').click()
        cy.get('#open-text-area').type('teste').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it.only('Campo telefone continua vazio quando preenchido com o valor não númerico', function(){
        cy.get('#phone').type('abcdefghij').should('have.value','')
    })

    it.only('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Lívia').click()
        cy.get('#lastName').type('Marconi da Rocha').click()
        cy.get('#email').type('liviamarconi31@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    it.only('Preenche e limpe os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Lívia').should('have.value', 'Lívia').clear().should('have.value','')

        cy.get('#lastName').type('Marconi da Rocha').should('have.value', 'Marconi da Rocha').clear().should('have.value','')

        cy.get('#email').type('liviamarconi31@gmail.com').should('have.value', 'liviamarconi31@gmail.com').clear().should('have.value','')

        cy.get('#phone').type('988912085').should('have.value', '988912085').clear().should('have.value','')
    })

    it.only('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it.only('envia o formuário com sucesso usando um comando customizado', function(){ //parte relacionada a comandos customizados
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong').should('be.visible')
    })

    it.only('Seleciona um produto (YouTube) por seu TEXTO', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it.only('Seleciona um produto (Mentoria) por seu VALOR (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it.only('Seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it.only('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })

    it.only('marca cada tipo de atendimento', () => {
        cy.get('[type="radio"]')
            .should('have.length', 3)
            .each(res => {
                cy.get(res).check()
                .should('be.checked')
    
            })
    })

    it.only('Marca ambos checkboxes, depois desmarca o último', function (){
        cy.get('input[type="checkbox"]').check().uncheck().last().should('not.be.checked')
    })

    it.only('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Lívia').click()
        cy.get('#lastName').type('Marconi da Rocha').click()
        cy.get('#email').type('liviamarconi31@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it.only('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"').should('not.have.value').selectFile('cypress/fixtures/example.json').should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function(){ //arrastando o arquivo, anexo
        cy.get('input[type="file"')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action:'drag-drop' }).should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"').selectFile('@sampleFile')
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })



})