class popUpMenuModel {
  logList: object[];

  constructor() {
    this.logList = [];
  }

  addLog(log: object) {
    this.logList = [...this.logList, log];
  }
}

export { popUpMenuModel };
