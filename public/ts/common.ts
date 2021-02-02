class Observable {
  _observers: Set<any>;
  constructor() {
    this._observers = new Set();
  }
  subscribe(observer:Set<any>) {
    this._observers.add(observer);
  }
  unSubscribe(observer:Set<any>) {
    this._observers.delete(observer);
  }
  notify(...param: (any[] | Element)[]) {
    this._observers.forEach(observer => observer(...param));
  }
}

export {Observable};