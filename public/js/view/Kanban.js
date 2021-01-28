import {initKanbanSection} from"./KanbanSection";
import {createElementFromHTML} from"../util";
import {initSectionController} from"../controller/kanbanSectionController";
export function initKanban(){

    const container=document.querySelector("#container");
    const kanbanHTML=`<div id="kanban"></div>`;
    const kanban=createElementFromHTML(kanbanHTML);
    container.appendChild(kanban);
    initKanbanSection({sectionID:"todo",title:"해야할 일"});
    initKanbanSection({sectionID:"doing",title:"하는 중"});
    initKanbanSection({sectionID:"done",title:"다했어"});
    initSectionController({sectionID:"todo"});
    initSectionController({sectionID:"doing"});
    initSectionController({sectionID:"done"});


}