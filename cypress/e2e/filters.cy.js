describe("Filters", () => {
  it("Clear applied filters", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get('[data-cy="show-filters-btn"]').should("be.visible").click();
    cy.get('[data-cy="checkbox"]').first().click({ force: true });
    cy.get('[data-cy="clear-all"]')
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.url().should("contain", "/");
  });

  it("Filter products by category from filter screen", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get('[data-cy="show-filters-btn"]').should("be.visible").click();
    cy.get('[data-cy="filter-menu"]').should("be.visible");
    cy.get('[data-cy="checkbox"]').first().click({ force: true });
    cy.url().should("contain", "/?categories=");
    cy.get('[data-cy="filter-bar-item"]').should("be.visible");
  });

  it("Filter products by a text options from filter screen", () => {
    cy.visit("/");
    cy.wait(1000);
    cy.get('[data-cy="show-filters-btn"]').should("be.visible").click();
    cy.get('[data-cy="filter-menu"]').should("be.visible");
    cy.get('[data-cy="filter-btn"]').first().click({ force: true });
    cy.url().should("contain", "/?options=");
    cy.get('[data-cy="filter-bar-item"]').should("be.visible");
  });
});
