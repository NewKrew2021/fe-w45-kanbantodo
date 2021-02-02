/*
    request.js
    모델에 들어갈 CRUD를 도와 주는 함수들
*/

export function addCard(input) {
    return fetch('http://localhost:5000/addCard', {
        method: 'post',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res })
}


//input : {cardId:_, listId:_, title:_}
export function addList(input) {
    return fetch('http://localhost:5000/addlist', {
        method: 'post',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res })
}

// 리스트뷰 아이템 타이틀 수정
export function editList({ cardId, id, input }) {
    console.log(cardId,id,input);
    return fetch(`http://localhost:5000/list/edit/${cardId}/${id}`, {
        method: "put",
        body: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res })
}

// 카드 타이틀 수정
export function editCardTitle({ cardId, input }) {
    return fetch(`http://localhost:5000/list/edit/${cardId}`, {
        method: "put",
        body: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res })
}

// cardId의 카드 삭제
export function removeCard({ cardId }){
    return fetch(`http://localhost:5000/list/remove/${cardId}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res })
}

// cardId의 id 리스트뷰 삭제
export function removeList({ cardId, id }) {
    return fetch(`http://localhost:5000/list/remove/${cardId}/${id}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res })
}

// 사용자 액션 등록
export function addUserHistory(input){
    return fetch('http://localhost:5000/addHistory', {
        method: 'post',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res })
}

// 사용자 액션 기록 불러오기
export function getHistory(){
    return fetch('http://localhost:5000/getHistory', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res.json() });
}

export function getAllData() {
    return fetch('http://localhost:5000/posts', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res.json() });
}