/// <reference types="cypress" />

/**
 * Custom command: add a todo through the UI without repeating
 * the selector in every spec.
 */
Cypress.Commands.add('addTodo', (text: string) => {
  cy.get('.new-todo').type(`${text}{enter}`);
});

/**
 * Custom command: seed the TodoMVC app via localStorage is not used here
 * on purpose — the app under test owns its storage format, so tests
 * create state through the UI, exactly as a user would.
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /** Type a todo into `.new-todo` and submit it. */
      addTodo(text: string): Chainable<void>;
    }
  }
}

export {};
