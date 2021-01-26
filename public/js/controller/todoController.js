import { render } from "../view/TodoSection";
import {fetchTodo,createTodo,deleteTodo} from"../model/todoModel";

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

    //insert including panel manipulation
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
    //insert: call POST API
    addItemBtn.addEventListener("click",()=>{
        const newTitle=textArea.value;
        createTodo(handleTodoListChange,{title:newTitle,author:"justin"});
        textArea.value="";
        addItemBtn.disabled=true;
    });

    
    //inital data fetch
    fetchTodo(handleTodoListChange);


    //delete
    const todoListElement=todoSection.querySelector("#todo-list");
    todoListElement.addEventListener("click",onDeleteBtnClick);
    function onDeleteBtnClick(e){
        if(!e.target.className.includes("delete-btn")) return ;
        const todoItem=e.target.closest(".todo-item");
        const dbID=todoItem.attributes.dbID.value;
        deleteTodo(handleTodoListChange,dbID);
    }

}
