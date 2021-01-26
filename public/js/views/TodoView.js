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
        <div class="todo-title">${todo}</div>
        <div class="todo-contents">
          <div class="todo-items">Todo 만들기</div>
          <div class="todo-items">Todo 만들기</div>
          <div class="todo-items">Todo 만들기</div>
          <div class="todo-items">Todo 만들기</div>
        </div>
      </div>
    `
  });
  contents.innerHTML = contentsHtml;
}

export {TodoView, createTodoBoard};