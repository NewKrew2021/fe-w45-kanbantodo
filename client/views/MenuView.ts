/*
    menuView.ts
    우측 사이드 메뉴바 부분
*/
import * as dom from 'client/src/util'
import TodoModel from 'client/models/TodoModel'
import relataiveTime from 'dayjs/plugin/relativeTime'
import { domTpl } from 'client/views/template';
import { HistoryState } from 'client/src/interface'
import dayjs from 'dayjs'

interface Menu {
    model: TodoModel
    speed: string
    width: string
}

class MenuView {
    model: TodoModel
    speed: string
    width: string
    menuBar: HTMLElement
    constructor({ model, speed, width }: Menu) {
        this.model = model;
        this.speed = speed;
        this.width = width;
        this.model.subscribe(this.update.bind(this))
        this.menuBar = dom.query('.menu-wrapper');
    }

    // TodoModel의 상태값 변경 시, 기록이 남도록
    update() {
        this.onEvents();
        this.writeHistory();
       // this.removeHistory();
    }

    onEvents() {
        this.showMenuBar();
        this.closeMenuBar();
    }

    init() {
        this.showMenuBar();
        this.closeMenuBar();
        this.writeHistory();
        this.removeHistory();
    }

    // menuBar hover Event
    showMenuHandler() {
        this.menuBar.style.transition = this.speed;
        this.menuBar.style.transform = "translate(0, 0)";
    }
    closeMenuHandler() {
        this.menuBar.style.transform = `translate(${this.width}, 0)`;
    }
    showMenuBar() {
        const menuBtn = dom.query('#menuBtn');
        menuBtn.addEventListener('click', this.showMenuHandler.bind(this));
    }
    closeMenuBar() {
        const menuCloseBtn = dom.query('.menu-close');
        menuCloseBtn.addEventListener('click', this.closeMenuHandler.bind(this));
    }

    // history state DB 값에 따라 업데이트
    async writeHistory() {
        const userActions : Array<HistoryState> = await this.model.getHistory();
        dom.html(dom.query('.menu-item-wrapper'), "");
        dayjs.extend(relataiveTime);

        const createHTML = ({ data, type } : {data : HistoryState, type: string}) => {
            const write = dayjs(data.writeTime);
            return domTpl[type]({ 
                action : data.action,
                afterTitle : data.afterTitle,
                beforeTitle : data.beforeTitle,
                cardName : data.cardName,
                writeTime : dayjs(write).fromNow() });
        };

        userActions.forEach(element => {
            const allObj = { data: element, type: element.action };
            const historyItem = dom.create({ type: 'div', className: ['menu-item', 'relative']});
            dom.html(historyItem, createHTML(allObj));
            dom.query('.menu-item-wrapper').prepend(historyItem); // 위부터 추가하기 위해
        });
    }

    
    async removeHistoryHandler(){
        await this.model.removeHistory();
    }
    removeHistory(){
        const removeBtn = dom.query('.menu-history-remove');
        removeBtn.addEventListener('click', this.removeHistoryHandler.bind(this));
    }
}

export default MenuView;