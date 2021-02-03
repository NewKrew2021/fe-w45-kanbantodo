/*
    menuView.ts
    우측 사이드 메뉴바 부분
*/
import * as _dom from 'client/src/util'
import TodoModel from 'client/models/TodoModel'
import relataiveTime from 'dayjs/plugin/relativeTime'
import { domTpl } from 'client/views/template';
import dayjs from 'dayjs'

interface Menu {
    model: TodoModel
    speed: string
    width: string
}

interface History{
    action: string
    afterTitle: string
    beforeTitle: string
    cardName: string
    writeTime: number
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
        this.menuBar = _dom.query('.menu-wrapper');
    }

    // TodoModel의 상태값 변경 시, 기록이 남도록
    update() {
        this.onEvents();
        this.writeHistory();
    }

    onEvents() {
        this.showMenuBar();
        this.closeMenuBar();
    }

    init() {
        this.showMenuBar();
        this.closeMenuBar();
        this.writeHistory();
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
        const menuBtn = _dom.query('#menuBtn');
        menuBtn.addEventListener('click', this.showMenuHandler.bind(this));
    }
    closeMenuBar() {
        const menuCloseBtn = _dom.query('.menu-close');
        menuCloseBtn.addEventListener('click', this.closeMenuHandler.bind(this));
    }

    // history state DB 값에 따라 업데이트
    async writeHistory() {
        const userActions : Array<History> = await this.model.getHistory();
        _dom.html(_dom.query('.menu-item-wrapper'), "");
        dayjs.extend(relataiveTime);

        const createHTML = ({ data, type } : {data : History, type: string}) => {
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
            const historyItem = _dom.create({ type: 'div', className: ['menu-item', 'relative']});
            _dom.html(historyItem, createHTML(allObj));
            _dom.query('.menu-item-wrapper').prepend(historyItem);
        });
    }
}

export default MenuView;