const API = (function() {
    const API_URL = 'http://localhost:5000'
    function getTodoData() {
        return fetch(`${API_URL}/todos`, {
            "method": 'GET',
            "headers":{
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return res.json()
        });
    }

    function createNewNote(colId, data) {
        return fetch(`${API_URL}/note/${colId}`, {
            "method": 'post',
            "headers": {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.status
        })
    }

    function getColumnData(id) {
        return fetch(`${API_URL}/column/${id}`, {
            "method": 'GET',
            "headers":{
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return res.json()
        });
    }

    function deleteNote(colId, noteId) {
        return fetch(`${API_URL}/note/${colId}/${noteId}`, {
            "method": "delete",
            "headers":{
                "Content-Type": "application/json",
            }
        }).then((res) => {
            console.log(res)
            return res;
            // return res.json();
        })
    }

    function createNewColumn(colName) {
        return fetch(`${API_URL}/column`,{
            "method":"post",
            "headers":{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data: {title: colName}}),
        }).then((res) => {
            return res.status;
        })
    }

    function deleteColumn(colId) {
        return fetch(`${API_URL}/column/${colId}`, {
            "method": "delete",
            "headers":{
                "Content-Type": "application/json",
            }
        }).then((res) => {
            console.log(res)
            return res;
            // return res.json();
        })
    }

    function updateColumn(colId, title) {
        return fetch(`${API_URL}/column/${colId}`,{
            "method":"put",
            "headers":{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data: {title}}),
        }).then((res) => {
            return res.status;
        })
    }

    return {
        getTodoData,
        createNewNote,
        getColumnData,
        deleteNote,
        createNewColumn,
        deleteColumn,
        updateColumn
    };
})();

export default API;
