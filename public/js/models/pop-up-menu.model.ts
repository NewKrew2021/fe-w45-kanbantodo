const TODO_API_HOST = "http://localhost:8000/api/todo";
const LOG_TYPE = "log";

class PopUpMenuModel {
  logList: object[];

  constructor() {
    this.logList = [];
  }

  async addLog(logData: object) {
    let res = await this.postLogData(logData);
    let newLog = await res.json();

    this.logList = [...this.logList, newLog];

    return this.logList;
  }

  postLogData(logData: any): any {
    return fetch(TODO_API_HOST, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logData),
    });
  }
}

export { PopUpMenuModel };
