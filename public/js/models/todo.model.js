const CARD_LIST = [
  { content: "PR 날리기", writer: "puba" },
  { content: "PR 날리기", writer: "puba" },
  { content: "PR 날리기", writer: "puba" },
];

class TodoModel {
  constructor(status = null) {
    this.cardList = [];
    this.status = status;
  }

  getCardData() {
    this.cardList = CARD_LIST;
  }

  addCardData(todoData) {
    return fetch("http://localhost:8000/api/todo", {
      method: "POST",
      body: JSON.stringify(todoData),
    });
  }

  init() {
    this.getCardData();
    return this;
  }
}

export { TodoModel };
