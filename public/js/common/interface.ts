interface ILog {
  type: string;
  profile: string;
  writer: string;
  content: string;
  from: string;
  to: string;
  time: string;
}

interface IPopUpMenuTPL {
  statusTask(content: string, card: string, todoList: string): string;
  moveTask(content: string, from: string, to: string): string;
  detailItem(profile: string, writer: string, time: string, taskTPL: string): string;
}

export { ILog, IPopUpMenuTPL };
