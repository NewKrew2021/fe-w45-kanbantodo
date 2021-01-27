import { createElementFromHTML } from "../util.js";
function initKanbanSection({sectionID,title}) {
    const container = document.querySelector("#kanban");
    const Section = createElementFromHTML(
    `<div id="${sectionID}-section" class="section">
        ${title}
        <button class="open-panel-btn">+</button>
        <button class="section-delete-btn">X</button>
        <div class="add-panel hide">
            <textArea rows=3 placeholder="Enter a note" maxlength="500"></textArea>
            <button class="add-item-btn" disabled>Add</button>
            <button class="cancel-btn">Cancel</button>
        </div>
        <div class="item-list"></div>
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
    container.appendChild(Section);

}


function render({sectionID,taskListData}) {
    const section=document.querySelector(`#${sectionID}-section`);
    const ListElement=section.querySelector(".item-list");
    const tasksHTML = taskListData.reduce((acc, { _id,title,author }) =>
        `<div class="item" dbid=${_id}>
            <img src="/public/image/task.png"></img>
            <button class="delete-btn">X</button>
            <div class="title">${title}</div>
            <div class="author">added by ${author}</div>
        </div>`+acc
        , "");
    ListElement.innerHTML = tasksHTML;
}
export { initKanbanSection, render };