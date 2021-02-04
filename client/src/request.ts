/*
    request.ts
    모델에 들어갈 CRUD를 도와 주는 함수들
*/
import { NewCardState, NewNoteState, HistoryState, MovedData } from 'client/src/interface'

export function addCardReq(input : NewCardState) {
    return fetch(`${ADD_CARD_URL}`, {
        method: 'post',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res })
}

//input : {cardId:_, listId:_, title:_}
export function addList(input : NewNoteState) {
    return fetch(`${ADD_LIST_URL}`, {
        method: 'post',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res })
}

// 리스트뷰 아이템 타이틀 수정
export function editList({ cardId, id, input }: { cardId: string, id: string, input: string }) {
    return fetch(`${EDIT_URL}/${cardId}/${id}`, {
        method: "put",
        body: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res })
}

// 카드 타이틀 수정
export function editCardTitle({ cardId, input }: { cardId: string, input: string }) {
    return fetch(`${EDIT_URL}/${cardId}`, {
        method: "put",
        body: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res })
}

// cardId의 카드 삭제
export function removeCard({ cardId }: { cardId: string }) {
    return fetch(`${REMOVE_URL}/${cardId}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res })
}

// cardId의 id 리스트뷰 삭제
export function removeList({ cardId, id }: { cardId: string, id: string }) {
    return fetch(`${REMOVE_URL}/${cardId}/${id}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res })
}

// list 움직이기(dropUP 이후)
export function moveList({cardId, input}: {cardId: string, input: Array<MovedData>}){
    return fetch(`${FETCH_URL}/move/${cardId}`, {
        method: "put",
        body: JSON.stringify({input}),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => { return res })
}

// 사용자 액션 등록
export function addUserHistory(input: HistoryState) {
    return fetch(`${ADD_HISTORY_URL}`, {
        method: 'post',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res })
}

// 사용자 액션 기록 불러오기
export function getHistory() {
    return fetch(`${GET_HISTORY_URL}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res.json() });
}

export function removeAllHistory(){
    return fetch(`${FETCH_URL}/remove/history`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res)=> {return res })
}

export function getAllData() {
    return fetch(`${GET_ALL_DATA_URL}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((res) => { return res.json() });
}