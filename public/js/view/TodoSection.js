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
    const todosHTML = todosListData.reduce((acc, { title }) =>
        acc + `<div>${title}</div>`
        , "");
    todoListElement.innerHTML = todosHTML;
}
export { initTodoSection, render };