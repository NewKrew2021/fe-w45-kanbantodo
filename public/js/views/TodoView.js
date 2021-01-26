class TodoView {
  constructor(){}
}

const createTodoBoard = (todos) => {
  console.log(todos);
  const contents = document.querySelector("div.contents");
  let contentsHtml = ``;
  todos.forEach(todo => {
    contentsHtml += `
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
  contents.innerHTML = contentsHtml;
}

export {TodoView, createTodoBoard};