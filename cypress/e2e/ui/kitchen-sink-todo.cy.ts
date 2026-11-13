/**
 * Second UI target: the Cypress Kitchen Sink Todo app
 * (https://example.cypress.io/todo). It ships with two seeded todos,
 * so these tests assert against that known seeded state instead of
 * assuming an empty list.
 */
describe('Cypress Kitchen Sink — todo app (example.cypress.io/todo)', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');
    cy.get('.todo-list li').should('have.length', 2);
  });

  it('shows the two seeded todos', () => {
    cy.contains('.todo-list li', 'Pay electric bill').should('be.visible');
    cy.contains('.todo-list li', 'Walk the dog').should('be.visible');
  });

  it('adds a new todo to the seeded list', () => {
    cy.get('.new-todo').type('Feed the cat{enter}');
    cy.get('.todo-list li').should('have.length', 3);
    cy.contains('.todo-list li', 'Feed the cat').should('be.visible');
  });

  it('completes a seeded todo and shows it as completed', () => {
    cy.contains('.todo-list li', 'Pay electric bill').find('.toggle').check();
    cy.contains('.todo-list li', 'Pay electric bill').should('have.class', 'completed');
  });
});
