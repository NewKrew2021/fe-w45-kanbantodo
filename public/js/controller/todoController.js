import { render } from "../view/TodoSection";
import {fetchTodo,createTodo,deleteTodo,updateTodo} from"../model/todoModel";

export function initTotoController(){

    let s = {};
    let state = new Proxy(s, {
        set: function (target, key, value) { 
            target[key] = value;
            render(target[key]);
            return true;
        }
    });
    state.todoList = [];

    function handleTodoListChange(todoList){
        state.todoList=todoList;
    }

    //SELECT
    fetchTodo(handleTodoListChange);

    //INSERT logic including panel manipulation
    const todoSection=document.querySelector("#todo-section");
    const openPanelBtn=todoSection.querySelector(".open-panel-btn");
    openPanelBtn.addEventListener("click",handleAddPanel);
    const addPanel=todoSection.querySelector(".add-panel");
    function handleAddPanel({target}){
        const section = target.closest(".section");
        if(addPanel.className.includes("hide")){
            addPanel.classList.remove("hide");
            addPanel.classList.add("show");
        }else if(addPanel.className.includes("show")){
            addPanel.classList.remove("show");
            addPanel.classList.add("hide");
        }
    }
    const textArea = todoSection.querySelector("textArea");
    const addItemBtn = todoSection.querySelector(".add-item-btn");
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
        createTodo(handleTodoListChange,{title:newTitle,author:"justin"});
        textArea.value="";
        addItemBtn.disabled=true;
    });

    //UPDATE logic
    const todoList=todoSection.querySelector(".item-list");
    const modal=todoSection.querySelector(".modal");
    const modalOverlay=modal.querySelector(".modal-overlay");
    let updateTargetID="";
    //const modalContent=modal.querySelector(".modal-content");
    const modalTextArea=modal.querySelector(".title");
    const submitBtn=modal.querySelector(".submit");
    todoList.addEventListener("dblclick",({target})=>{
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
        updateTodo(handleTodoListChange,{dbID:updateTargetID,title:modalTextArea.value});
    });

    //DELETE
    const todoListElement=todoSection.querySelector("#todo-list");
    todoListElement.addEventListener("click",onDeleteBtnClick);
    function onDeleteBtnClick(e){
        if(!e.target.className.includes("delete-btn")) return ;
        const result = window.confirm("정말 삭제하시겠습니까?");
        if(!result) return;
        const todoItem=e.target.closest(".item");
        const dbID=todoItem.attributes.dbID.value;
        deleteTodo(handleTodoListChange,dbID);
    }

}
