class Observable {
  constructor() {
    this._observers = new Set();
  }
  subscribe(observer) {
    this._observers.add(observer);
  }
  unSubscribe(observer) {
    this._observers.delete(observer)
  }
  notify(...param) {
    this._observers.forEach(observer => observer(...param));
  }
}

export {Observable};