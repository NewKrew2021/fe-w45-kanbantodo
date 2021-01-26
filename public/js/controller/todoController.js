import { render } from "../view/TodoSection";
import {fetchTodo,createTodo} from"../model/todoModel";

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

    const handleTodoListChange=(todoList)=>{
        state.todoList=todoList;
    }

    const todoSection=document.querySelector("#todo-section");
    const addBtn=todoSection.querySelector("#add-btn");
    addBtn.addEventListener("click",()=>{
        createTodo(handleTodoListChange,{title:"새 할 일"});
    });
    
    fetchTodo(handleTodoListChange);

}
