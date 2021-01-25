class Observable {
    constructor() {
        this._observers = new Set();
    }
    subscribe(observer) {
        this._observers.add(observer);
        // 구독 시 this._observers에 추가된다.
    }
    unsubscribe(observer) {
        this._observers = [...this._observers].filter(subscriber => subscriber !== observer);
    }
    notify(data) {
        this._observers.forEach(observer => observer(data));
        // 이 notify가 호출되면, 구독 리스트에 있는 함수들을 실행시킨다.
    }
}

export default Observable;