import { $, createNewElement, deleteElement, getTime } from "@public/js/common/utils";
import { USER, TODO_TYPE, LOG_TYPE } from "@public/js/variables/config";

const DRAGGABLE_ELEMENTS = ["todo-card", "todo-card--content", "todo-card--writer"];

const PROFILE_IMAGE =
  "https://avatars.githubusercontent.com/u/37804777?s=460&u=088956f4c1a3613536ddb54dac7492b469a12ca9&v=4";

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
    this.movingElement = null;
    this.newTodoList = null;
    this.isCardMoving = false;
    this.originalMovingElement = null;
    this.mouseMoveEvent = this.mouseMoveEvent.bind(this);
    this.mouseDownEvent = this.mouseDownEvent.bind(this);
    this.mouseUpEvent = this.mouseUpEvent.bind(this);
    this.addLog = this.addLog.bind(this);
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
          type: TODO_TYPE,
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

  moveAt(pageX, pageY) {
    this.movingElement.style.left = `${pageX - this.movingElement.offsetWidth / 2}px`;
    this.movingElement.style.top = `${pageY - this.movingElement.offsetHeight / 2}px`;
  }

  mouseMoveEvent(event) {
    if (!this.movingElement) return;

    this.movingElement.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    this.newTodoList = elemBelow.closest(".todo");
    this.movingElement.hidden = false;
    this.moveAt(event.pageX, event.pageY);
  }

  mouseDownEvent({ target }) {
    if (!DRAGGABLE_ELEMENTS.includes(target.className)) return;
    this.originalMovingElement = target.closest(".todo-card");
    this.movingElement = this.originalMovingElement.cloneNode(true);
    this.originalMovingElement.style.opacity = 0.5;

    this.movingElement.style.position = "absolute";
    this.movingElement.style.zIndex = 1000;

    document.body.append(this.movingElement);

    document.addEventListener("mousemove", this.mouseMoveEvent);
  }

  addLog(popUpMenuModel, notifyLog) {
    let log = {
      writer: USER,
      type: LOG_TYPE,
      content: this.movingElement.innerText.split("\n")[0],
      from: this.originalMovingElement.closest(".todo").id,
      to: this.movingElement.closest(".todo").id,
      time: getTime(),
      profile: PROFILE_IMAGE,
    };
    popUpMenuModel.addLog(log);
    notifyLog(popUpMenuModel.logList);
  }

  mouseUpEvent(updateCardStatus, notify, popUpMenuModel, notifyLog) {
    return () => {
      if (!this.movingElement) return;
      if (this.newTodoList) {
        this.movingElement.style = "";

        this.newTodoList.appendChild(this.movingElement);
        // log에 추가
        this.addLog(popUpMenuModel, notifyLog);

        // 기존 node 삭제
        deleteElement(this.originalMovingElement);

        notify(
          updateCardStatus({ id: this.originalMovingElement.id, status: this.newTodoList.id })
        );
      } else {
        deleteElement(this.movingElement);
        this.originalMovingElement.style = null;
      }

      document.removeEventListener("mousemove", this.mouseMoveEvent);
      this.movingElement = null;
    };
  }

  HandleDragAndDrop(updateCardStatus, notify, popUpMenuModel, notifyLog) {
    this.element.addEventListener("mousedown", this.mouseDownEvent);
    document.addEventListener(
      "mouseup",
      this.mouseUpEvent(updateCardStatus, notify, popUpMenuModel, notifyLog)
    );
  }

  render(cardList, status) {
    if (!cardList) cardList = [];
    this.element.id = this.status;
    this.element.innerHTML = this.createTodo(cardList, status);
  }

  init() {
    $(".todo-list").appendChild(this.element);
    this.render([], this.status);

    return this;
  }
}

export { TodoView };
