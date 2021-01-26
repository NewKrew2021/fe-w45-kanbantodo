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

  async addCard(cardData) {
    let res = await this.postCardData(cardData);
    let newCard = await res.json();
    this.cardList = [...this.cardList, newCard];
    return this.cardList;
  }

  async deleteTodo(todoData) {
    await this.deleteCardData(todoData);

    this.cardList = this.cardList.filter(({ _id }) => {
      return _id !== todoData.id;
    });

    return this.cardList;
  }

  postCardData(todoData) {
    return fetch(TODO_API_HOST, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
  }

  deleteCardData(todoData) {
    return fetch(TODO_API_HOST, {
      method: "DELETE",
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
