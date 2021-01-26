function fetchTodo(handlechange) {
    fetch("/todos", { method: 'GET', })
        .then((res) => res.json())
        .then((data) => {
            handlechange(data.todos);
        }).catch((err) => console.log);
}
function createTodo(handleChange,{title,author}) {
    const data = { title: title,author:author };
    fetch("/todos", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        handleChange(data.todos);
    }).catch((err) => console.log);

}
function deleteTodo(handleChange, dbID){

    fetch("/todos", {
        method: 'DELETE',
        body: JSON.stringify({id:dbID}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        handleChange(data.todos);
    }).catch((err) => console.log);
}

export { fetchTodo, createTodo,deleteTodo };