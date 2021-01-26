class TodoView {
  constructor(model){
    this.model = model;
  }

  todoAddButton() {
    const addButton = document.querySelectorAll("div.title-add");
    console.log(addButton)
    addButton.forEach( button => {
      button.addEventListener("click", e => {
        const parentEle = e.currentTarget.parentNode.parentNode;
        console.log(parentEle.child)
      })
    })
  }
  
  init() {
    this.model.subscribe(displayTodoBoard);
    this.model.subscribe(displayCard);
    this.model.getInitialData()
    .then(this.todoAddButton)
  }
}

const displayTodoBoard = (todos) => {
  const contents = document.querySelector("div.contents");
  let contentHtml = ``;
  todos.forEach(todo => {
    contentHtml += `
      <div class="todo-container">
        <div class="todo-title">
          <div class="title-li title-img">
            <svg class="svg-class">
              <circle cx="13" cy="13" r="13" fill="#c9cdd3" />
            </svg>
          </div>
          <div class="title-li title-number">${todo.items.length}</div>
          <div class="title-li title-text">${todo.title}</div>
          <div class="title-li title-add">+</div>
          <div class="title-li title-delete">x</div>
        </div>
      </div>
    `
  });
  contents.innerHTML = contentHtml;
}

const displayCard = (cards) => {
  const contents = document.querySelectorAll("div.todo-container");
  for(let idx=0; idx<cards.length; idx++) {
    let cardsHtml = ``;
    cards[idx]["items"].forEach(card => {
      // console.log(card)
      cardsHtml += `
        <div class="todo-contents">
          <div class="todo-items">
            ${card.title}
            <div class="todo-author"> Added by ${card.author}</div>
          </div>
        </div>
      `
    });
    contents[idx].innerHTML += cardsHtml;
  }
}



export {TodoView, displayTodoBoard};