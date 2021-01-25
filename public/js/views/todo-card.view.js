const TODO_TPL = {
  todoCard(content, writer) {
    return `
      <div class="todo-card">
        <div class="todo-card--content">${content}</div>
        <div class="todo-card--writter">${writer}</div>
        <div class="todo-card--delete-button">x</div>
      </div>`;
  },
};

class TodoCard {
  constructor() {}
}
