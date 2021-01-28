/*
    request.js
    모델에 들어갈 CRUD를 도와 주는 함수들
*/

//input : {cardId:_, listId:_, title:_}
export function addList(input) {
    return fetch('http://localhost:5000/addlist', {
        method: 'post',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { console.log(res) })
}

// 리스트뷰 아이템 타이틀 수정
export function editList({cardId, id, input}){
    return fetch(`http://localhost:5000/list/edit/${cardId}/${id}`, {
        method: "put",
        body: JSON.stringify(input),
        headers :{
            "Content-Type": "application/json",
        }
    }).then((res) => { console.log(res) })
}

// cardId의 id 리스트뷰 삭제
export function removeList({cardId, id}){
    return fetch(`http://localhost:5000/list/remove/${cardId}/${id}`, {
        method: "delete",
        headers :{
            "Content-Type": "application/json",
        }
    }).then((res) => { console.log(res) })
}

export function getAllData() {
    return fetch('http://localhost:5000/posts', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) =>{ return res.json() });
}