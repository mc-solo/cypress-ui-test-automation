/**
 * Page Object for the TodoMVC app (https://demo.playwright.dev/todomvc).
 * Selectors follow the standard TodoMVC markup: `.new-todo`,
 * `.todo-list li`, `.toggle`, `.destroy`, `.clear-completed`.
 */
export class TodoPage {
  visit(): void {
    cy.visit('https://demo.playwright.dev/todomvc');
    cy.get('.new-todo').should('be.visible');
  }

  addTodo(text: string): void {
    cy.get('.new-todo').type(`${text}{enter}`);
  }

  addTodos(texts: string[]): void {
    texts.forEach((text) => this.addTodo(text));
  }

  todoItem(text: string) {
    return cy.contains('.todo-list li', text);
  }

  toggleTodo(text: string): void {
    this.todoItem(text).find('.toggle').check();
  }

  deleteTodo(text: string): void {
    // The destroy button only appears on hover; force the click.
    this.todoItem(text).find('.destroy').click({ force: true });
  }

  editTodo(oldText: string, newText: string): void {
    this.todoItem(oldText).find('label').dblclick();
    cy.get('.todo-list li.editing .edit').clear().type(`${newText}{enter}`);
  }

  filter(filterName: 'All' | 'Active' | 'Completed'): void {
    cy.contains('.filters a', filterName).click();
  }

  clearCompleted(): void {
    cy.get('.clear-completed').click();
  }

  toggleAll(): void {
    cy.get('.toggle-all').click();
  }

  assertTodoCount(expected: number): void {
    cy.get('.todo-list li').should('have.length', expected);
  }

  assertRemainingCount(expected: number): void {
    cy.get('.todo-count').should('contain', String(expected));
  }
}

export const todoPage = new TodoPage();
