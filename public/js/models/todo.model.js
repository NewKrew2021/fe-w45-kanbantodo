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
  init() {
    this.getCardData();
  }
}

export { TodoModel };
