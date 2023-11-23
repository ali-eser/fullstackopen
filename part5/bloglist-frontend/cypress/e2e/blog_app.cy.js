describe('Blog app', function() {
  beforeEach(function() {
    cy.request('DELETE', 'http://localhost:3003/api/users/reset')
    cy.request('DELETE', 'http://localhost:3003/api/blogs')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'fso',
      password: 'fullstackopen',
      name: 'FSO'
    })
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username:')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'fso', password: 'fullstackopen' })
      cy.contains('FSO logged in')
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
      }).then(response => {
        expect(response.status).to.eq(401)
      })
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'fso', password: 'fullstackopen' })
    })
  
    it('a new blog can be created and be liked', function() {
      cy.get('#add-blog-show').click()
      cy.get('#title').type('Full Stack Open')
      cy.get('#author').type('Matti Luukkainen')
      cy.get('#url').type('fullstackopen.com')
      cy.get('#submit').click()

      cy.contains('likes:')

      cy.get('#view-button').click()
      cy.get('#like-button').click()

      cy.contains('likes: 1')
    })

    it('the user can delete their blog', function() {
      cy.get('#add-blog-show').click()
      cy.get('#title').type('Full Stack Open')
      cy.get('#author').type('Matti Luukkainen')
      cy.get('#url').type('fullstackopen.com')
      cy.get('#submit').click()

      cy.contains('likes:')

      cy.get('#view-button').click()
      cy.get('#remove-blog-button').click()

      cy.contains('likes:').should('not.exist')
    })

    it('only the user who added the blog can remove it', function() {
      cy.get('#add-blog-show').click()
      cy.get('#title').type('Full Stack Open')
      cy.get('#author').type('Matti Luukkainen')
      cy.get('#url').type('fullstackopen.com')
      cy.get('#submit').click()

      cy.contains('likes:')
      cy.get('#view-button').click()

      cy.get('#logout-button').click()
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'cs50',
        password: 'harvard',
        name: 'CS50'
      })
      cy.login({ username: 'cs50', password: 'harvard' })
      cy.contains('#remove-blog-button').should('not.exist')
    })
  })
})