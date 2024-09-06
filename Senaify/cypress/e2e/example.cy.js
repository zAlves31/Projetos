describe('Teste da tela de pesquisa', () => {
  before(() => {

    cy.visit('/');

  })
  it('Redirecionar a minha tela para a tela de busca', () => {

    cy.get("[href='/Search']").click()

    cy.scrollTo("top")
  })

  it('Procurar por uma musica e toca-la', () => {
    cy.intercept('GET', 'https://api.spotify.com/v1/search*').as('searchResults');

    cy.get("[data-testid='campoBusca']").type("MTG - Burguesinha").then(() => {
    
      cy.wait('@searchResults');

    cy.get("[aria-label='music-item']").contains('MTG - Burguesinha').first().click();

    cy.scrollTo("top")
    })
  });

  // it('Clicar no primeiro card com o texto exato', () => {
    //cy.get("[aria-label='music-item']").contains(/^(Mina do Condomínio)/i).click
    //cy.get("[aria-label='music-item']").filter(":contains('Mina do Condomínio')").click()
  // });

  it('Clicou no botao de curtir', async () => {

    cy.wait(1500)

    cy.get("[aria-label='music-item']").filter(":contains('Mina do Condomínio')").then((item) => {
      cy.wrap(item).find("[data-testid='icon-button").click()
    })
  });
})  

