import {render}from "../view/KanbanSection";
import {addActivity} from"./activityModel.ts";
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

        const time=data.time;
        addActivity({action:"add",title,sectionName:sectionID,author,time});
    }catch(err){
        console.error(err);
    }

}
async function deleteTask(sectionID, {dbID,title,author}){
    try{
        const res = await fetch(`/kanban`, {
            method: 'DELETE',
            body: JSON.stringify({sectionID,id:dbID,title,author}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data=await res.json();
        taskList=data.tasks;
        render({sectionID,taskListData:taskList});

        const time=data.time;
        addActivity({action:"delete",title,sectionName:sectionID,author,time});
    }catch(err){
        console.error(err);
    }

}
async function updateTask(sectionID,{dbID,title,newTitle,author}){
    try{
        const res=await fetch(`/kanban`, {
            method: 'PUT',
            body: JSON.stringify({sectionID,id:dbID,title:title,newTitle,author}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data=await res.json();
        taskList=data.tasks;
        render({sectionID,taskListData:taskList});

        const time=data.time;
        addActivity({action:"update",title,sectionName:sectionID,newTitle,author,time});
    }catch(err){
        console.error(err);
    }
}
export { fetchTasks , createTask, deleteTask ,updateTask };