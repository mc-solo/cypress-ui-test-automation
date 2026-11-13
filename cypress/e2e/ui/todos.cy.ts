import { todoPage } from '../../support/pages/TodoPage';

describe('TodoMVC — todos (demo.playwright.dev/todomvc)', () => {
  beforeEach(() => {
    todoPage.visit();
  });

  it('adds a single todo and shows it in the list', () => {
    todoPage.addTodo('Buy groceries');
    todoPage.assertTodoCount(1);
    todoPage.todoItem('Buy groceries').should('be.visible');
    todoPage.assertRemainingCount(1);
  });

  it('adds multiple todos from a fixture', () => {
    cy.fixture('todos').then((data: { todos: string[] }) => {
      todoPage.addTodos(data.todos);
      todoPage.assertTodoCount(data.todos.length);
      data.todos.forEach((text) => todoPage.todoItem(text).should('be.visible'));
    });
  });

  it('adds a todo via the cy.addTodo() custom command', () => {
    cy.addTodo('Custom command todo');
    todoPage.assertTodoCount(1);
    todoPage.todoItem('Custom command todo').should('be.visible');
  });

  it('marks a todo as completed and updates the remaining count', () => {
    todoPage.addTodo('Buy groceries');
    todoPage.toggleTodo('Buy groceries');
    todoPage.todoItem('Buy groceries').should('have.class', 'completed');
    todoPage.assertRemainingCount(0);
  });

  it('deletes a todo', () => {
    todoPage.addTodos(['Keep this', 'Delete this']);
    todoPage.deleteTodo('Delete this');
    todoPage.assertTodoCount(1);
    todoPage.todoItem('Keep this').should('be.visible');
    cy.contains('.todo-list li', 'Delete this').should('not.exist');
  });

  it('edits a todo by double-clicking its label', () => {
    todoPage.addTodo('Write Cypress tests');
    todoPage.editTodo('Write Cypress tests', 'Write Cypress tests (updated)');
    todoPage.todoItem('Write Cypress tests (updated)').should('be.visible');
  });

  it('filters to show only active todos', () => {
    todoPage.addTodos(['Active one', 'Done one']);
    todoPage.toggleTodo('Done one');
    todoPage.filter('Active');
    todoPage.assertTodoCount(1);
    todoPage.todoItem('Active one').should('be.visible');
  });

  it('filters to show only completed todos', () => {
    todoPage.addTodos(['Active one', 'Done one']);
    todoPage.toggleTodo('Done one');
    todoPage.filter('Completed');
    todoPage.assertTodoCount(1);
    todoPage.todoItem('Done one').should('be.visible');
  });

  it('clears completed todos', () => {
    todoPage.addTodos(['Active one', 'Done one']);
    todoPage.toggleTodo('Done one');
    todoPage.clearCompleted();
    todoPage.assertTodoCount(1);
    todoPage.todoItem('Active one').should('be.visible');
  });

  it('toggles all todos at once', () => {
    todoPage.addTodos(['First', 'Second']);
    todoPage.toggleAll();
    todoPage.assertRemainingCount(0);
    cy.get('.todo-list li.completed').should('have.length', 2);
  });

  it('does not create a todo from an empty entry', () => {
    cy.get('.new-todo').type('{enter}');
    todoPage.assertTodoCount(0);
  });

  it('persists todos after a page reload', () => {
    todoPage.addTodo('Buy groceries');
    cy.reload();
    todoPage.todoItem('Buy groceries').should('be.visible');
    todoPage.assertTodoCount(1);
  });
});
