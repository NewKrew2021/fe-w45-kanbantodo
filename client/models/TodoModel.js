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

class TodoModel extends Observable {
    constructor(initialUrl) {
        super();
        this.todos = []; // state
        this.url = initialUrl; // 가져올 데이터의 요청 URL
    }

    // 리스트뷰(todo) 추가할 때마다 상태가 변화하고, 그 때마다 Observer(view들)에게 알려 준다.
    async addTodo({ idx, inputData }) {
        const res = await req.getAllData();
        const curlen = res[idx].data.length - 1;
        let listId;
        if (res[idx].data.length === 0)
            listId = 0;
        else
            listId = res[idx].data[curlen].id + 1;
        
        // 받은 todo값을 적당히 가공하고 넣기
        const inputObj = {
            input: {
                cardId: parseInt(idx),
                listId: listId,
                title: inputData
            }
        }
        await req.addList(inputObj);

        // 데이터에 추가 후 notify 한다.
        this.todos = [...this.todos, res];
        this.notify(this.todos);
    }

    // 리스트뷰(todo) 삭제, 상태 변화, Observer에게 알려 준다.
    async removeTodo({ cardId, id }) {
        await req.removeList({ cardId, id });
        const res = await req.getAllData();
        this.todos = [...this.todos, res];
        this.notify(this.todos);
    }

    // todo 데이터 가져오기. json-server로부터 GET 요청으로 데이터를 가져올 수 있다.
    async getInitialData() {
        const res = await fetch(this.url);
        const data = await res.json();
        this.todos = [...this.todos, data];
        return this.todos;
    }
}

export default TodoModel;