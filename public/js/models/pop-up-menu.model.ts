const TODO_API_HOST = "http://localhost:8000/api/todo";
const LOG_TYPE = "log";

interface Log {
  type: string;
  profile: string;
  writer: string;
  content: string;
  from: string;
  to: string;
  time: string;
}

class PopUpMenuModel {
  logList: Log[];

  constructor() {
    this.logList = [];
  }

  async getLogData() {
    let res = await fetch(TODO_API_HOST);
    return await res.json();
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

  clusterLogData(logData: Log[]) {
    return logData.filter((log) => {
      return log.type === LOG_TYPE;
    });
  }

  async initData() {
    let res = await this.getLogData();

    this.logList = this.clusterLogData(res);
    return this.logList;
  }
}

export { PopUpMenuModel };
