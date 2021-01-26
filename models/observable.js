class Observable {
    constructor() {
        this._observers = [];
    }
    subscribe(observer) {
        this._observers = [ ... this._observers, observer];
        // 구독 시 this._observers에 추가된다. 즉, 옵저버를 매개 변수로 받아서 배열에 등록한다.
    }
    unsubscribe(observer) {
        this._observers = this._observers.filter(subscriber => subscriber !== observer);
    }
    notify(state) {
        this._observers.forEach(observer => observer(state));
        // 이 notify가 호출되면, 구독 리스트에 있는 함수들(옵저버들이 등록된 배열)을 실행시킨다.
    }
}

export default Observable;