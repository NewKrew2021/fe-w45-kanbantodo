const TODO_TPL = {
  todoHeader(totalCount, status) {
    return `
      <div class="todo-header">
        <div class="todo-header--total-count">${totalCount}</div>
        <div class="todo-header--title">${status}</div>
        <div class="todo-header--add-button">+</div>
        <div class="todo-header--delete-button">-</div>
      </div>`;
  },
  todoCard(content, writer) {
    return `
      <div class="todo-card">
        <div class="todo-card--content">${content}</div>
        <div class="todo-card--writter">${writer}</div>
        <div class="todo-card--delete-button">x</div>
      </div>`;
  },
};

class TodoList {
  constructor() {}
}
