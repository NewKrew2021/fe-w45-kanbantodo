function fetchTasks(sectionID,handlechange) {
    const data = { sectionID };
    fetch(`/kanban?`+new URLSearchParams({
        sectionID,
    }), { method: 'GET', })
        .then((res) => res.json())
        .then((data) => {
            handlechange(data.todos);
        }).catch(console.log);
}
function createTask(sectionID,handleChange,{title,author}) {
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
        handleChange(data.todos);
    }).catch(console.log);

}
function deleteTask(sectionID,handleChange, dbID){

    fetch(`/kanban`, {
        method: 'DELETE',
        body: JSON.stringify({sectionID,id:dbID}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        handleChange(data.todos);
    }).catch(console.log);
}
function updateTask(sectionID,handleChange,{dbID,title}){
    fetch(`/kanban`, {
        method: 'PUT',
        body: JSON.stringify({sectionID,id:dbID,title:title}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        handleChange(data.todos);
    }).catch(console.log);
}
export { fetchTasks , createTask,deleteTask ,updateTask };