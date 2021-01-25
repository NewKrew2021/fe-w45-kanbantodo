import { $, createNewElement } from "../common/utils";

const TODO_TPL = {
  todoHeader(status, totalCount) {
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

class TodoView {
  constructor() {
    this.element = createNewElement("div", "todo", "");
  }

  createTodo(cardList, status) {
    return (
      TODO_TPL.todoHeader(status, cardList.length) +
      cardList.reduce((acc, { content, writer }) => {
        return acc + TODO_TPL.todoCard(content, writer);
      }, "")
    );
  }

  render(cardList, status) {
    this.element.innerHTML = this.createTodo(cardList, status);
  }

  init() {
    $(".todo-list").appendChild(this.element);
    return this;
  }
}

export { TodoView };
