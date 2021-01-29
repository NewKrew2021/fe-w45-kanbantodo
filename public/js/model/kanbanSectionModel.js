import {render}from "../view/KanbanSection";
let taskList=[];

async function fetchTasks(sectionID) {

    try{
        const res = await fetch(`/kanban?`+new URLSearchParams({sectionID,}), { 
            method: 'GET', 
        });
        const data=await res.json();
        taskList=data.tasks;
        render({sectionID,taskListData:taskList});
    }catch(err){
        console.error(err);
    }

}
async function createTask(sectionID,{title,author}) {
    try{
        const bodyData = { sectionID,title,author };
        const res = await fetch(`/kanban`, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        taskList=data.tasks;
        render({sectionID,taskListData:taskList});
    }catch(err){
        console.error(err);
    }

}
async function deleteTask(sectionID, dbID){
    try{
        const res = await fetch(`/kanban`, {
            method: 'DELETE',
            body: JSON.stringify({sectionID,id:dbID}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data=await res.json();
        taskList=data.tasks;
        render({sectionID,taskListData:taskList});
    }catch(err){
        console.error(err);
    }

}
async function updateTask(sectionID,{dbID,title}){
    try{
        const res=await fetch(`/kanban`, {
            method: 'PUT',
            body: JSON.stringify({sectionID,id:dbID,title:title}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data=await res.json();
        taskList=data.tasks;
        render({sectionID,taskListData:taskList});
    }catch(err){
        console.error(err);
    }
}
export { fetchTasks , createTask, deleteTask ,updateTask };