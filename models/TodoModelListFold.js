/*
    TodoModelListFold.js
    - Subject
    - 상태(state)가 변경될 대상
    - Observable - 구독, 비구독, notify 메서드 재정의
    - 모델(의 상태)이 변경될 때, 구독자(들)에게 알림을 준다(=>notify 메서드 실행과 동일)

    필요한 상태값 :
        삭제할 리스트값
*/
import Observable from './observable.js'

class TodoModelListFold extends Observable{
    constructor(initialUrl){
        super();
        this.todos = []; // state
        this.url = initialUrl; // 가져올 데이터의 요청 URL
    }

    // 삭제할 todo의 인덱스
    removeTodo(idx){
        /* */
    }
}