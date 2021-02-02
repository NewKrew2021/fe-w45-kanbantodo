import moment from "moment";
import Observable from "../utils/Observable";

class Action extends Observable{
    constructor() {
        super();
        this.state = [];
        this.render = this.render.bind(this);
        this.renderActivity = this.renderActivity.bind(this);
    }
    init() {
        this.subscribe(this.render);
        const sidemenuButton = document.querySelector('header > .menu-button');
        const sidemenuEle = document.querySelector('.side-menu');
        const sidemenuCloseButon = sidemenuEle.querySelector('.side-menu__header > .close-button');
        sidemenuButton.addEventListener('click', (e) => {
            sidemenuEle.classList.add('active');
        })
        sidemenuCloseButon.addEventListener('click', (e) => {
            sidemenuEle.classList.remove('active')
        })
        
    }
    addActionHistory(contentHtml) {
        this.state = [...this.state, {contentHtml, timestamp: Date.now()}];
        this.notify(this.state);
    }
    addColumn(title) {
        const newHistory = `@nina added the column ${title}`;
        this.addActionHistory(newHistory);
    }
    deleteColumn(title) {
        const newHistory = `@nina deleted the column ${title}`;
        this.addActionHistory(newHistory);
    }
    editColumn(title, newTitle) {
        console.log(title);
        const newHistory = `@nina updated the column ${title} to ${newTitle}`;
        this.addActionHistory(newHistory);
    }
    addNote(title, columnName) {
        const newHistory = `@nina added ${title} to ${columnName}`;
        this.addActionHistory(newHistory);
    }
    deleteNote(title, columnName) {
        const newHistory = `@nina deleted ${title} to ${columnName}`;
        this.addActionHistory(newHistory);
    }
    render (data) {
        const activityListHtml = data.reduce((acc, cur) => {
            return acc + this.renderActivity(cur)
        }, '');
        const container = document.querySelector('.side-menu > .activity-card-list');
        container.innerHTML = activityListHtml;
    }
    renderActivity({contentHtml, timestamp}) {
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