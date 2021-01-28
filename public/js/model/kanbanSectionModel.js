import {render}from "../view/KanbanSection";
let taskList=[];

function fetchTasks(sectionID) {
    const data = { sectionID };
    fetch(`/kanban?`+new URLSearchParams({
        sectionID,
    }), { method: 'GET', })
        .then((res) => res.json())
        .then((data) => {
            taskList=data.tasks;
            render({sectionID,taskListData:taskList});
    }).catch(console.log);
}
function createTask(sectionID,{title,author}) {
    const data = { sectionID,title,author };
    fetch(`/kanban`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        taskList=data.tasks;
        render({sectionID,taskListData:taskList});
    }).catch(console.log);

}
function deleteTask(sectionID, dbID){

    fetch(`/kanban`, {
        method: 'DELETE',
        body: JSON.stringify({sectionID,id:dbID}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        taskList=data.tasks;
        render({sectionID,taskListData:taskList});
    }).catch(console.log);
}
function updateTask(sectionID,{dbID,title}){
    fetch(`/kanban`, {
        method: 'PUT',
        body: JSON.stringify({sectionID,id:dbID,title:title}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        taskList=data.tasks;
        render({sectionID,taskListData:taskList});
    }).catch(console.log);
}
export { fetchTasks , createTask, deleteTask ,updateTask };