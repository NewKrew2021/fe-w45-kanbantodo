import {fetchTodo,createTodo} from"../model/todoModel";
import {createElementFromHTML} from "../util.js";
export function initTotoList(){
    let todosListData;
    const container=document.querySelector("#container");
    const todoSection=createElementFromHTML(`<div id="todo-section">
        <button id="add-btn">+</button>
        <div id="todo-list"></div>
    </div>`);
    container.appendChild(todoSection);
    const todoList=todoSection.querySelector("#todo-list");
    const addBtn=todoSection.querySelector("#add-btn");
    addBtn.addEventListener("click",insertAndRender);
    function render(){
        const todosHTML=todosListData.reduce((acc,{title})=>
            acc+`<div>${title}</div>`
        ,"");
        todoList.innerHTML=todosHTML;
    }
    async function insertAndRender(){
        todosListData = await createTodo({title:"새 할 일"});
        render();
    }
    
    async function fetchAndRender(){
        todosListData=await fetchTodo();
        render();
    }
    fetchAndRender();

}
