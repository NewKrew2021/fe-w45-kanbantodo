class Observable {
    constructor(){
        this.observers = new Set();
        this.notify = this.notify.bind(this);
    }
    notify(data){
        this.observers.forEach((subscriber) => {
            subscriber(data);
        })
    }
    subscribe(observer) {
        this.observers.add(observer);
    }
}

export default Observable;