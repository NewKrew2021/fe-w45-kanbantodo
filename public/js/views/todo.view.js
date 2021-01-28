import { $, createNewElement } from "../common/utils";

const USER = "puba";

const TODO_TPL = {
  addTodo() {
    return `  
    <div class="add-todo-card">
      <input type="text" class="add-todo-card__input" placeholder="Enter a note" />
        <div class="add-todo-card__button-list">
          <button class="add-button">Add</button>
          <button class="cancel-button">Cancel</button>
      </div>
    </div>`;
  },
  todoHeader(status, totalCount) {
    return `
      <div class="todo-header">
        <div class="todo-header--total-count">${totalCount}</div>
        <div class="todo-header--title">${status}</div>
        <div class="todo-header--add-button">✛</div>
        <div class="todo-header--delete-button">✕</div>
      </div>`;
  },
  todoCard(content, writer, _id) {
    return `
      <div class="todo-card" id="${_id}">
        <div class="todo-card--content">${content}</div>
        <div class="todo-card--writter">${writer}</div>
        <div class="todo-card--delete-button">x</div>
      </div>`;
  },
};

class TodoView {
  constructor(status = null) {
    this.element = createNewElement("div", "todo", "");
    this.render = this.render.bind(this);
    this.status = status;
  }

  createTodo(cardList, status) {
    return (
      TODO_TPL.todoHeader(status, cardList.length) +
      TODO_TPL.addTodo() +
      cardList.reduce((acc, { content, writer, _id }) => {
        return acc + TODO_TPL.todoCard(content, writer, _id);
      }, "")
    );
  }

  getNewTodoData(callback) {
    this.element.addEventListener("click", ({ target }) => {
      if (target.className === "add-button") {
        let newTodoData = {
          content: $(".add-todo-card__input", this.element).value,
          status: this.status,
          writer: USER,
        };
        callback(newTodoData);
      }
    });
  }

  deleteTodo(callback) {
    this.element.addEventListener("click", ({ target }) => {
      if (target.className === "todo-card--delete-button") {
        let deleteTarget = {
          id: target.closest(".todo-card").id,
          status: this.status,
        };
        callback(deleteTarget);
      }
    });
  }

  HandleDragAndDrop() {
    this.element.addEventListener("mousedown", ({ target }) => {
      if (!["todo-card", "todo-card--content", "todo-card--writer"].includes(target.className))
        return;

      let movingElement = target.closest(".todo-card").cloneNode(true);

      movingElement.style.position = "absolute";
      movingElement.style.zIndex = 1000;

      document.body.append(movingElement);
      let newTodoList = null;

      const moveAt = (pageX, pageY) => {
        movingElement.style.left = `${pageX - movingElement.offsetWidth / 2}px`;
        movingElement.style.top = `${pageY - movingElement.offsetHeight / 2}px`;
      };

      const onMouseMove = (event) => {
        movingElement.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        newTodoList = elemBelow.closest(".todo");
        movingElement.hidden = false;
        moveAt(event.pageX, event.pageY);
      };

      document.addEventListener("mousemove", onMouseMove);

      movingElement.addEventListener("mouseup", () => {
        if (newTodoList) {
          movingElement.style = "";
          newTodoList.appendChild(movingElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
      });
    });
  }

  render(cardList, status) {
    if (!cardList) cardList = [];
    this.element.innerHTML = this.createTodo(cardList, status);
  }

  init() {
    $(".todo-list").appendChild(this.element);
    this.HandleDragAndDrop();
    return this;
  }
}

export { TodoView };
