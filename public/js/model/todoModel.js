function fetchTodo(todosList) {
    return fetch("/todos", { method: 'GET', })
        .then((res) => res.json())
        .then((data) => {
            return data.todos;
        }).catch((err) => console.log);
}
function createTodo({ title }) {
    const data = { title: title };
    return fetch("/todos", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((res) => res.json())
            .then((data) => {
                return data.todos;
            }).catch((err) => console.log);

}

export { fetchTodo, createTodo };