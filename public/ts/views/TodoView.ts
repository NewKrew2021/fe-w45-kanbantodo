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
    document.addEventListener("dblclick", event => {
      const eventEle = event.target as HTMLTextAreaElement;
      if(eventEle.classList.contains("title-text")){
        const titleText = eventEle.innerHTML;
        const editModal = document.querySelector("div.column-modal") as HTMLTextAreaElement;
        // 모달창 생기게
        this.displayModalWindow(editModal);

        // 모달창 이벤트
        this.addEditModalEvent(editModal, titleText);

        // 뒷배경 흐리게

      }
    })
  }

  addEditModalEvent(ele:HTMLElement, titleText:string){
    const addEditModal = (event: Event) => {
      const eventEle = event.target as HTMLTextAreaElement;
      if(eventEle.classList.contains("column-cancel")){
        this.nonDisplayModalWindow(ele);
        const inputEle = ele.querySelector("#column-name") as HTMLTextAreaElement;
        inputEle.value = ``;
        ele.removeEventListener("click",addEditModal);

        // 다시 뒷배경 진하게
      }
      else if(eventEle.classList.contains("update-btn")){
        // update to db
        const inputEle = ele.querySelector("#column-name") as HTMLTextAreaElement;
        this.model.modifyTodoTitle(titleText, inputEle.value)
        .then(this.cardModel.getCard.bind(this.cardModel))
        .then(()=>this.nonDisplayModalWindow(ele));
      }
    }
    ele.addEventListener("click", addEditModal);
  }

  displayModalWindow(ele:HTMLElement) {
    ele.classList.remove("non-display");
  }
  nonDisplayModalWindow(ele:HTMLElement) {
    ele.classList.add("non-display");
  }

  
  init() {
    this.model.subscribe(this.displayTodoBoard);
    this.model.getInitialData()
    this.columnTitleClickEvent();
  }
}

export {TodoView};