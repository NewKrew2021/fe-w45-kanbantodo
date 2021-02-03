import { TodoModel } from "../models/TodoModel";

class TodoView {
  model: TodoModel;
  constructor(model: TodoModel){
    this.model = model;
  }

  displayTodoBoard(todos: any[]) {
    const contents = document.querySelector("div.contents") as HTMLTextAreaElement;
    let initHtml = ``;
    const contentHtml = todos.reduce((initHtml: string, todo: { cards: string | any[]; title: any; }) => {
      return initHtml += `
        <div class="todo-container">
          <div class="todo-title">
            <div class="title-li title-img">
              <svg class="svg-class">
                <circle cx="13" cy="13" r="13" fill="#c9cdd3" />
              </svg>
            </div>
            <div class="title-li title-number">${todo.cards.length}</div>
            <div class="title-li title-text">${todo.title}</div>
            <div class="title-li title-add">+</div>
            <div class="title-li title-delete">✕</div>
          </div>
          <div class="todo-add non-display">
            <input type="text" class="add-input"></input>
            <button class="add-button" type="button">Add</button>
            <button class="cancel-button" type="button">Cancel</button>
          </div>
          <div class="item-container"></div>
        </div>
      `
    }, initHtml);
    contents.innerHTML = contentHtml;
  }

  columnTitleClickEvent() {
    console.log(123);
    document.addEventListener("dblclick", event => {
      const eventEle = event.target as HTMLTextAreaElement;
      if(eventEle.classList.contains("title-text")){
      }
    })
  }

  
  init() {
    this.model.subscribe(this.displayTodoBoard);
    this.model.getInitialData()
    this.columnTitleClickEvent();
  }
}

export {TodoView};