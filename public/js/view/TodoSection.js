import { createElementFromHTML } from "../util.js";
function initTodoSection() {
    const container = document.querySelector("#container");
    const todoSection = createElementFromHTML(`<div id="todo-section">
        <button id="add-btn">+</button>
        <div id="todo-list"></div>
    </div>`);
    container.appendChild(todoSection);

}


function render(todosListData) {
    const todoListElement=document.querySelector("#todo-list");
    const todosHTML = todosListData.reduce((acc, { _id,title,author }) =>
        acc + `<div class="todo-item" dbID=${_id}>
        <button class="delete-btn">X</button>
        <div>${title}</div>
        <div>${author}</div>
        </div>`
        , "");
    todoListElement.innerHTML = todosHTML;
}
export { initTodoSection, render };