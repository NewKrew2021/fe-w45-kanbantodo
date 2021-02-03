interface Observable {
    observers: Set<Function>;
}

class Observable {
    constructor(){
        this.observers = new Set();
        this.notify = this.notify.bind(this);
    }
    notify(data: Object){
        this.observers.forEach((subscriber) => {
            subscriber(data);
        })
    }
    subscribe(observer:Function) {
        this.observers.add(observer);
    }
}

export default Observable;