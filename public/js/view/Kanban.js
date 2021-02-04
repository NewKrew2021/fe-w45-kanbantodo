import {initKanbanSection} from"./KanbanSection";
import {createElementFromHTML} from"../util";
import {initSectionController} from"../controller/kanbanSectionController";
import {initAppendSection,fetchSections} from"./AppendSection.ts";
export async function initKanban(){

    const container=document.querySelector("#container");
    const kanbanHTML=`<div id="kanban"></div>`;
    const kanban=createElementFromHTML(kanbanHTML);
    container.appendChild(kanban);

    const kanbanInitData = await fetchSections();
    kanbanInitData.forEach(({sectionID,title}) => {
        initKanbanSection({sectionID,title});
        initSectionController({sectionID});
    });
    initAppendSection();
}

