/*
    TodoModel.js
    - Subject
    - 상태(state)가 변경될 대상
    - Observable - 구독, 비구독, notify 메서드 재정의
    - 모델(의 상태)이 변경될 때, 구독자(들)에게 알림을 준다(=>notify 메서드 실행과 동일)

    필요한 상태값 :
        새롭게 입력되는 todo의 값
*/
import Observable from './observable.js'
import * as req from 'client/src/request';
import * as dom from 'client/src/util'
import { ModalState, NewCardState, NewNoteState, HistoryState } from 'client/src/interface'

class TodoModel extends Observable {
    url: string
    todos: Array<any>
    state: ModalState
    history: HistoryState
    constructor(initialUrl: string) {
        super();
        this.todos = []; // data state
        this.state = {  // modal state
            cardId: '',
            id: ''
        };
        this.history = { // history state
            action: '',
            afterTitle: '',
            beforeTitle: '',
            cardName: '',
            writeTime: 0
        };
        this.url = initialUrl; // 가져올 데이터의 요청 URL
    }

    //{ id:_, name:_, author:_}
    async addCard({ name, author }: { name: string, author: string }) {
        const res = await req.getAllData();
        let cardId ;
        if (res.length !== 0){
            cardId = res[res.length - 1].id + 1;
        } else{
            cardId = 0;
        }
        const inputObj : NewCardState = {
            id: cardId,
            name: name,
            author: author
        }
        await req.addCardReq(inputObj);
        this.todos = [...this.todos, res];
        this.notify(this.todos);
    }

    async removeCard({ cardId }: { cardId: string }) {
        await req.removeCard({ cardId });
        this.notify(this.todos)
    }

    // 리스트뷰(todo) 추가할 때마다 상태가 변화하고, 그 때마다 Observer(view들)에게 알려 준다.
    async addTodo({ cardId, inputData }: { cardId: string, inputData: string }) {
        const res = await req.getAllData();
        //let listId : string; // uuid
        let listId : string = '';
        res.forEach((e : any, i : number) =>{
            if (parseInt(e.id) === parseInt(cardId)) {
                listId = dom.guid();
            }
        });
        // 받은 todo값을 가공하고 넣기
        const inputObj : NewNoteState = {
            cardId: cardId, listId: listId, title: inputData
        }
        await req.addList(inputObj);
        this.todos = [...this.todos, res];
        this.notify(this.todos);
    }

    // 리스트뷰(note item) 삭제, 상태 변화, Observer에게 알려 준다.
    async removeTodo({ cardId, id } : {cardId: string, id: string}) {
        await req.removeList({ cardId, id });
        this.notify(this.todos)
    }

    // 리스트뷰(note item)의 타이틀 수정
    async editTodo(input : any, mode : string) {
        if (mode === 'note') {
            await req.editList(input);
            this.notify(this.todos);
        }
        else if (mode === 'card') {
            await req.editCardTitle(input);
            this.notify(this.todos);
        }
    }

    setModalState({ cardId, id } : ModalState) {
        this.state = { ...this.state, cardId: cardId, id: id };
        return this.state;
    }

    // 어떤 카드에, 어떤 이벤트(추가, 삭제, 수정)가 이루어졌는지
    // action : ADD_CARD / ADD_NOTE / REMOVE_NOTE / EDIT_NOTE / EDIT_CARD / REMOVE_CARD
    setHistoryState({ cardName, beforeTitle,
        afterTitle, writeTime, action } : HistoryState) {
        this.history = {
            ...this.history,
            cardName: cardName,
            beforeTitle: beforeTitle,
            afterTitle: afterTitle,
            writeTime: writeTime,
            action: action
        };
        return this.history;
    }

    async addHistory({input} : {input: HistoryState}) {
        await req.addUserHistory(input);
    }

    async getHistory() {
        const data = await req.getHistory();
        return data;
    }

    async removeHistory(){
        await req.removeAllHistory();
        this.notify(this.history)
    }

    // todo 데이터 가져오기. json-server로부터 GET 요청으로 데이터를 가져올 수 있다.
    async getInitialData() {
        const data = await req.getAllData();
        this.todos = [...this.todos, data];
        return this.todos;
    }
}

export default TodoModel;