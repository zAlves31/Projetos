describe('template spec', () => {

  before(() => {

    cy.visit('/')
  })
  
  it('Verificar se o header esta visivel', () => {
    //capturar o elemento title, e ver se ele esta visivel
    cy.get("[aria-label='title-head']").should("be.visible")
    cy.get("[aria-label='title-head']").should("contain", "Good morning")
  });

  it('Verificar se existe itens na listagem de playlist', () => {
    cy.wait(2000)
    cy.get("[aria-label='playlist-item'").should("have.length.greaterThan", 0)
  });

  it('Clicar no primeiro item da lista', () => {
    cy.get("[aria-label='playlist-item'").first().click();
    cy.get("[aria-label='music-item'").should("have.length.greaterThan", 0)
  });

  it('Clicar na musica desejada e executar o audio', () => {
    // cy.get("[aria-label='music-item'").eq(1).click(); --eq(Numero da lista de qual musica tocar)  --eq pode substituir first
    cy.get("[aria-label='music-item']").contains("Mtg Quero Te Encontrar").click()

    cy.scrollTo("top")
  });
})