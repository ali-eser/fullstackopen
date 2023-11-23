describe('Blog app', function() {
  beforeEach(function() {
    /*cy.request('POST', 'http://localhost:3003/api/testing/reset')*/
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username:')
  })
})

describe('Login', function() {
  it('succeeds with correct credentials', function() {
    cy.login({ username: 'root', password: 'ali' })
    cy.contains('Superuser logged in')
  })

  it('fails with wrong credentials', function() {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/login',
      failOnStatusCode: false,
      auth: {
        username: 'wrong',
        password: 'wrong'
      }
    })
    cy.get('.notification')
      .should('contain', 'wrong username or password!')
  })
})