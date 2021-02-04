import moment from "moment";
import { ActionData } from "../utils/types";

class ActionView {
    constructor(){
        this.render = this.render.bind(this);
        this.init();
    }
    init(){
        this.onSidebarEvent();
    }
    onSidebarEvent(){
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

export default ActionView;