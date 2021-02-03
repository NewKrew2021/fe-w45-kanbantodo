import { TodoModel } from "../models/TodoModel";

class TodoView {
  model: TodoModel;
  cardModel: any;
  constructor(model: TodoModel, cardModel: object){
    this.model = model;
    this.cardModel = cardModel;
  }

  displayTodoBoard(todos: any[]) {
    const contents = document.querySelector("div.contents") as HTMLTextAreaElement;
    let contentHtml = todos.reduce((initHtml: string, todo: { cards: string | any[]; title: any; }) => {
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
    }, ``);
    contentHtml += `<div class="add-container">+ Add column</div>`
    contents.innerHTML = contentHtml;
    this.addAddColumnEvent();
    this.removeAddColumnEvent();
  }

  columnTitleClickEvent() {
    document.addEventListener("dblclick", event => {
      const eventEle = event.target as HTMLTextAreaElement;
      const todoEles = document.querySelectorAll("div.todo-container")
      if(eventEle.classList.contains("title-text")){
        const titleText = eventEle.innerHTML;
        const editModal = document.querySelector("div.column-modal") as HTMLTextAreaElement;
        this.displayModalWindow(todoEles, editModal);
        this.addEditModalEvent(editModal, titleText);
        // 뒷배경 흐리게
        
      }
    })
  }

  addEditModalEvent(ele:HTMLElement, titleText:string){
    const addEditModal = (event: Event) => {
      const eventEle = event.target as HTMLTextAreaElement;
      const todoEles = document.querySelectorAll("div.todo-container")
      if(eventEle.classList.contains("column-cancel")){
        this.nonDisplayModalWindow(todoEles, ele);
        const inputEle = ele.querySelector("#column-name") as HTMLTextAreaElement;
        inputEle.value = ``;
        ele.removeEventListener("click",addEditModal);
      }
      else if(eventEle.classList.contains("update-btn")){
        const inputEle = ele.querySelector("#column-name") as HTMLTextAreaElement;
        this.model.modifyTodoTitle(titleText, inputEle.value)
        .then(this.cardModel.getCard.bind(this.cardModel))
        .then(()=>this.nonDisplayModalWindow(todoEles, ele));
      }
    }
    ele.addEventListener("click", addEditModal);
  }

  addAddColumnEvent() {
    const addContainer = document.querySelector("div.add-container") as HTMLTextAreaElement;
    addContainer.addEventListener("click", e => {
      this.model.addColumn()
      .then(this.cardModel.getCard.bind(this.cardModel))
    })
  }

  removeAddColumnEvent() {
    const cancelBtns = document.querySelectorAll("div.title-delete");
    console.log(cancelBtns)
    cancelBtns.forEach(cancelBtn => {
      cancelBtn.addEventListener("click", e => {
        const eventEle = e.target as HTMLTextAreaElement;
        const todoEle = eventEle.closest(".todo-container") as HTMLTextAreaElement;
        const titleEle = todoEle.querySelector("div.title-text") as HTMLTextAreaElement;
        const todoTitle = titleEle.innerHTML;
        this.model.removeColumn(todoTitle)
        .then(this.cardModel.getCard.bind(this.cardModel));
      })
    })
  }

  displayModalWindow(todoEles: NodeListOf<Element>, modalEle:HTMLElement) {
    todoEles.forEach(todoEle => todoEle.classList.add("opacity-on"))
    modalEle.classList.remove("non-display");
  }
  nonDisplayModalWindow(todoEles: NodeListOf<Element>, modalEle:HTMLElement) {
    todoEles.forEach(todoEle => todoEle.classList.remove("opacity-on"))
    modalEle.classList.add("non-display");
  }

  init() {
    this.model.subscribe(this.displayTodoBoard.bind(this));
    this.model.getInitialData()
    this.columnTitleClickEvent();
  }
}

export {TodoView};