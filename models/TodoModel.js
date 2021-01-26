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

class TodoModel extends Observable{
    constructor(initialUrl){
        super();
        this.todos = []; // state
        this.url = initialUrl; // 가져올 데이터의 요청 URL
    }

    // todo 추가할 때마다 상태가 변화하고, 그 때마다 Observer(view들)에게 알려 준다.
    addTodo(idx, inpuData){
        // 받은 todo값을 적당히 가공하고 넣기
        const inputObj = {
            title : inpuData
        }
        this.todos[0][idx].data.push(inputObj)
        this.notify({state : this.todos, index: idx, added: inputObj});
    }

    // todo 데이터 가져오기. json-server로부터 GET 요청으로 데이터를 가져올 수 있다.
    async getInitialData(){
        const res = await fetch(this.url);
        const data = await res.json();
        this.todos = [...[], data];
        return this.todos;
    }
}

export default TodoModel;