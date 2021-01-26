const TODO_API_HOST = "http://localhost:8000/api/todo";

class TodoModel {
  constructor(status = null) {
    this.cardList = [];
    this.status = status;
  }

  async getCardData() {
    let res = await fetch(TODO_API_HOST);
    return await res.json();
  }

  addCardData(todoData) {
    return fetch(TODO_API_HOST, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
  }

  async initData() {
    let cardList = await this.getCardData();
    this.cardList = cardList;
    return this.cardList;
  }
}

export { TodoModel };
