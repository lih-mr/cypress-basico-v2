Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
cy.get('#firstName').type('Lívia')
cy.get('#lastName').type('Marconi da Rocha')
cy.get('#email').type('liviamarconi31@gmail.com')
cy.get('#open-text-area').type('Teste')
cy.contains('button', 'Enviar').click()
})
