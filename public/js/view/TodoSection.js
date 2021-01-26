import { createElementFromHTML } from "../util.js";
function initTodoSection() {
    const container = document.querySelector("#container");
    const todoSection = createElementFromHTML(`<div id="todo-section" class="section">
        해야할 일
        <button id="todo-add-btn" class="section-add-btn">+</button>
        <button class="section-delete-btn">X</button>
        <div id="todo-list"></div>
    </div>`);
    container.appendChild(todoSection);

}


function render(todosListData) {
    const todoListElement=document.querySelector("#todo-list");
    const todosHTML = todosListData.reduce((acc, { _id,title,author }) =>
        `<div class="todo-item item" dbID=${_id}>
        <img src="/public/image/todo.png"></img>
        <button class="delete-btn">X</button>
        <div class="title">${title}</div>
        <div class="author">added by ${author}</div>
        </div>`+acc
        , "");
    todoListElement.innerHTML = todosHTML;
}
export { initTodoSection, render };