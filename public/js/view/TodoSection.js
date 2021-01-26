import { createElementFromHTML } from "../util.js";
function initTodoSection() {
    const container = document.querySelector("#container");
    const todoSection = createElementFromHTML(
    `<div id="todo-section" class="section">
        해야할 일
        <button class="open-panel-btn">+</button>
        <button class="section-delete-btn">X</button>
        <div id="add-panel" class="add-panel hide">
            <textArea rows=3 placeholder="Enter a note" maxlength="500"></textArea>
            <button class="add-item-btn" disabled>Add</button>
            <button class="cancel-btn">Cancel</button>
        </div>
        <!-- id 없이 가능할까?-->
        <div id="todo-list" class="item-list"></div>
        <div class="modal modal-hide">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div>Note</div>
                <textArea rows=3 placeholder="Enter a note" 
                class="title" maxlength="200"></textArea>
                <button class="submit">Save note</button>
            </div>
        </div>
    </div>`);
    container.appendChild(todoSection);

}


function render(todosListData) {
    const todoListElement=document.querySelector("#todo-list");
    const todosHTML = todosListData.reduce((acc, { _id,title,author }) =>
        `<div class="item" dbid=${_id}>
            <img src="/public/image/todo.png"></img>
            <button class="delete-btn">X</button>
            <div class="title">${title}</div>
            <div class="author">added by ${author}</div>
        </div>`+acc
        , "");
    todoListElement.innerHTML = todosHTML;
}
export { initTodoSection, render };