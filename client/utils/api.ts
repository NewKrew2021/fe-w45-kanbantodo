import { NoteData } from "./types";
interface APIInterface {
    getTodoData: () => Promise<Response>;
    createNewNote: (colId: string, data: string) => Promise<Response>;
    getColumnData: (id: string) => Promise<Response>;
    deleteNote: (colId: string, noteId: string) => Promise<Response>;
    createNewColumn: (colId: string) => Promise<Response>;
    deleteColumn: (colId: string) => Promise<Response>;
    updateColumn: (colId: string, title: string) => Promise<Response>
}

const API: APIInterface = (function() {
    const API_URL = 'http://localhost:5000'
    function getTodoData() {
        return fetch(`${API_URL}/todos`, {
            "method": 'GET',
            "headers":{
                "Content-Type": "application/json",
            }
        })
    }

    function createNewNote(colId: string, title:string) {
        return fetch(`${API_URL}/note/${colId}`, {
            "method": 'post',
            "headers": {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title})
        })
    }

    function getColumnData(id: string) {
        return fetch(`${API_URL}/column/${id}`, {
            "method": 'GET',
            "headers":{
                "Content-Type": "application/json",
            }
        })
    }

    function deleteNote(colId: string, noteId: string) {
        return fetch(`${API_URL}/note/${colId}/${noteId}`, {
            "method": "delete",
            "headers":{
                "Content-Type": "application/json",
            }
        });
    }

    function createNewColumn(colName: string) {
        return fetch(`${API_URL}/column`,{
            "method":"post",
            "headers":{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title: colName}),
        })
    }

    function deleteColumn(colId: string) {
        return fetch(`${API_URL}/column/${colId}`, {
            "method": "delete",
            "headers":{
                "Content-Type": "application/json",
            }
        })
    }

    function updateColumn(colId: string, title: string) {
        return fetch(`${API_URL}/column/${colId}`,{
            "method":"put",
            "headers":{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data: {title}}),
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
