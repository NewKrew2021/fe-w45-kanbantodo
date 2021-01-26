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

    //insert
    const todoSection=document.querySelector("#todo-section");
    const addBtn=todoSection.querySelector("#add-btn");
    addBtn.addEventListener("click",()=>{
        createTodo(handleTodoListChange,{title:"새 할 일",author:"crong"});
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
