import moment from "moment";
import Observable from "../utils/Observable";

interface ActionData {
    contentHtml: string;
    timestamp: number;
}

interface Action {
    data: ActionData[];
}

class Action extends Observable{
    constructor() {
        super();
        this.data = [];
        this.render = this.render.bind(this);
        this.renderActivity = this.renderActivity.bind(this);
    }
    init() {
        this.subscribe(this.render);
        const sidemenuEle = document.querySelector('.side-menu');
        const sidemenuButton = document.querySelector('header > .menu-button');
        const sidemenuCloseButon = sidemenuEle && sidemenuEle.querySelector('.side-menu__header > .close-button');
        if (sidemenuEle && sidemenuButton && sidemenuCloseButon) {
            sidemenuButton.addEventListener('click', (e) => {
                sidemenuEle.classList.add('active');
            })
            sidemenuCloseButon.addEventListener('click', (e) => {
                sidemenuEle.classList.remove('active')
            })
        }
    }
    addActionHistory(contentHtml: string) {
        this.data = [...this.data, {contentHtml, timestamp: Date.now()}];
        this.notify(this.data);
    }
    addColumn(title: string) {
        const newHistory = `@nina added the column ${title}`;
        this.addActionHistory(newHistory);
    }
    deleteColumn(title: string) {
        const newHistory = `@nina deleted the column ${title}`;
        this.addActionHistory(newHistory);
    }
    editColumn(title: string, newTitle: string) {
        console.log(title);
        const newHistory = `@nina updated the column ${title} to ${newTitle}`;
        this.addActionHistory(newHistory);
    }
    addNote(title: string, columnName: string) {
        const newHistory = `@nina added ${title} to ${columnName}`;
        this.addActionHistory(newHistory);
    }
    deleteNote(title: string, columnName: string) {
        const newHistory = `@nina deleted ${title} to ${columnName}`;
        this.addActionHistory(newHistory);
    }
    render (data: ActionData[]) {
        const activityListHtml = data.reduce((acc, cur) => {
            return acc + this.renderActivity(cur)
        }, '');
        const container = document.querySelector('.side-menu > .activity-card-list');
        container && (container.innerHTML = activityListHtml);
    }
    renderActivity({contentHtml, timestamp}: ActionData) {
        return `<li class="activity-card">
            <div class="content">
                ${contentHtml}
            </div>
            <div class="time">${moment(timestamp).fromNow()}</div>
        </li>`
    }
}

const logger = new Action();

export default logger;