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
import * as req from '../src/request.js';

class ListModalModel extends Observable {
    constructor() {
        super();
        this.todos = [];
        this.state = {}; // data state
    }

    // 삭제버튼을 클릭한 Listview 아이템의 인덱스 정보
    openModal({ cardId, id }) {
        this.state = {...this.state, cardId: cardId, id: id};
        this.notify(this.state);
    }
    
    async getInitialData() {
        const res = await fetch('http://localhost:5000/posts');
        const data = await res.json();
        this.todos = [...this.todos, data];
        return this.todos;
    }
}

export default ListModalModel;