import {initKanbanSection} from"./KanbanSection";
import {createElementFromHTML} from"../util";
import {initSectionController} from"../controller/kanbanSectionController";
export function initKanban(){

    const container=document.querySelector("#container");
    const kanbanHTML=`<div id="kanban"></div>`;
    const kanban=createElementFromHTML(kanbanHTML);
    container.appendChild(kanban);


    const kanbanInitData = [
        {sectionID:"todo",title:"해야할 일"},
        {sectionID:"doing",title:"하는 중"},
        {sectionID:"done",title:"다했어"}
        ]
    

    kanbanInitData.forEach(({sectionID,title}) => {
        initKanbanSection({sectionID,title});
        initSectionController({sectionID});
    });
    initAppendSection();
}

function initAppendSection(){
    const kanban=document.querySelector("#kanban");
    kanban.innerHTML+=`<div id="append-section"> click to make new column</div>`
}