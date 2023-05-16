/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function (){
        cy.visit('./src/index.html') //visitando arquivo local ou seja, que esteja no pc
    }) 

    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') 
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){

        cy.clock()
        cy.get('#firstName').type('Lívia').click()
        cy.get('#lastName').type('Marconi da Rocha').click()
        cy.get('#email').type('liviamarconi31@gmail.com').click()
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Non mollitia veritatis est consectetur delectus ut blanditiis animi qui esse animi. Et laborum maiores ut soluta iusto et iusto blanditiis ut amet corrupti qui aliquid neque quo dolor fuga? Et maxime architecto quo omnis autem et labore consectetur.', { delay: 0}).click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success > strong').should('be.visible')
        cy.tick(3000)
        cy.get('.success > strong').should('not.be.visible')
    })
    
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()
        cy.get('#firstName').type('Lívia').click()
        cy.get('#lastName').type('Marconi da Rocha').click()
        cy.get('#email').type('liviamarconi31@gmail,com').click()
        cy.get('#open-text-area').type('teste').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    Cypress._.times(5, function(){
        it('Campo telefone continua vazio quando preenchido com o valor não númerico', function(){
            cy.get('#phone').type('abcdefghij').should('have.value','')
        })
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Lívia').click()
        cy.get('#lastName').type('Marconi da Rocha').click()
        cy.get('#email').type('liviamarconi31@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    
    it('Preenche e limpe os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Lívia').should('have.value', 'Lívia').clear().should('have.value','')

        cy.get('#lastName').type('Marconi da Rocha').should('have.value', 'Marconi da Rocha').clear().should('have.value','')

        cy.get('#email').type('liviamarconi31@gmail.com').should('have.value', 'liviamarconi31@gmail.com').clear().should('have.value','')

        cy.get('#phone').type('988912085').should('have.value', '988912085').clear().should('have.value','')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){ //parte relacionada a comandos customizados
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong').should('be.visible')
    })

    it('Seleciona um produto (YouTube) por seu TEXTO', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu VALOR (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('[type="radio"]')
            .should('have.length', 3)
            .each(res => {
                cy.get(res).check()
                .should('be.checked')
    
            })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function (){
        cy.get('input[type="checkbox"]').check().uncheck().last().should('not.be.checked')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Lívia').click()
        cy.get('#lastName').type('Marconi da Rocha').click()
        cy.get('#email').type('liviamarconi31@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Seleciona um arquivo da pasta fixtures', function(){
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

    it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
    it('Preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('teste', 20)

        cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
    
    })

    it('Faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should(function(response){
        console.log(response)
        })
    })

    it.only('Encontre o gato escondido', () => {
        cy.get('#cat').invoke('show').should('be.visible').invoke('hide').should('not.be.visible')
        cy.get('#title').invoke('text', 'CAT TAT')
        cy.get('#subtitle').invoke('text', 'Eu ❤️ Gatos')

    })
})