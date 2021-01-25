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

    // todo 추가할 때마다 상태가 변화하고 그 때마다 Observer(view들)에게 알려 준다.
    addTodo(todo){
        this.todos = [...this.todos, todo];
        this.notify(this.todos);
    }
    
    // todo 데이터 가져오기
    // get으로 json-server로부터 데이터를 가져올 수 있다.
    getInitialData(){
        fetch(this.url)
            .then(res => res.json())
            .then(data => console.log(data))
    }
}