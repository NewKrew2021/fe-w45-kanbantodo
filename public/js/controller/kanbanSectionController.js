import {fetchTasks,createTask,deleteTask,updateTask} from"../model/kanbanSectionModel";

export function initSectionController({sectionID}){

    //SELECT
    fetchTasks(sectionID);

    //INSERT logic including panel manipulation
    const section=document.querySelector(`#${sectionID}-section`);
    const openPanelBtn=section.querySelector(".open-panel-btn");
    openPanelBtn.addEventListener("click",handleAddPanel);
    const addPanel=section.querySelector(".add-panel");
    function handleAddPanel(){
        if(addPanel.className.includes("hide")){
            addPanel.classList.remove("hide");
            addPanel.classList.add("show");
        }else if(addPanel.className.includes("show")){
            addPanel.classList.remove("show");
            addPanel.classList.add("hide");
        }
    }
    const textArea = section.querySelector("textArea");
    const addItemBtn = section.querySelector(".add-item-btn");
    textArea.addEventListener("input",({target})=>{
        if(target.value===""){
            addItemBtn.disabled=true;
        }else{
            addItemBtn.disabled=false;
        }
    });
    //INSERT: call POST API
    addItemBtn.addEventListener("click",()=>{
        const newTitle=textArea.value;
        createTask(sectionID,{title:newTitle,author:"justin"});
        textArea.value="";
        addItemBtn.disabled=true;
    });

    //UPDATE logic
    const taskList=section.querySelector(".item-list");
    const modal=section.querySelector(".modal");
    const modalOverlay=modal.querySelector(".modal-overlay");
    let updateTargetID="";
    //const modalContent=modal.querySelector(".modal-content");
    const modalTextArea=modal.querySelector(".title");
    const submitBtn=modal.querySelector(".submit");
    taskList.addEventListener("dblclick",({target})=>{
        const item=target.closest(".item");
        if(item===null) return; // 외곽의 리스트 자체를 클릭했을때 리턴
        const title = item.querySelector(".title").innerHTML;
        modal.classList.remove("modal-hide");
        modal.classList.add("modal-show");
        updateTargetID=item.attributes.dbid.value;
        modalTextArea.value=title;
    });
    modalOverlay.addEventListener("click",()=>{
        modal.classList.remove("modal-show");
        modal.classList.add("modal-hide");
    });
    modalTextArea.addEventListener("input",({target})=>{
        if(target.value===""){
            submitBtn.disabled=true;
        }else{
            submitBtn.disabled=false;
        }
    });
    //UPDATE: call PUT API
    submitBtn.addEventListener("click",()=>{
        updateTask(sectionID,{dbID:updateTargetID,title:modalTextArea.value});
    });

    //DELETE
    const taskListElement=section.querySelector(".item-list");
    taskListElement.addEventListener("click",onDeleteBtnClick);
    function onDeleteBtnClick(e){
        if(!e.target.className.includes("delete-btn")) return ;
        const result = window.confirm("정말 삭제하시겠습니까?");
        if(!result) return;
        const taskItem=e.target.closest(".item");
        const dbID=taskItem.attributes.dbID.value;
        deleteTask(sectionID,dbID);
    }

}
