/*
    menuView.ts
    우측 사이드 메뉴바 부분
*/
import * as _dom from "../src/util"
import TodoModel from "../models/TodoModel"
import { domTpl } from './template';

const SPEED = "500ms";

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
        const userActions = await this.model.getHistory();
        _dom.html(_dom.query('.menu-item-wrapper'), "");
        const createHTML = ({ data, type }) => {
            let writeTime = Math.floor((Date.now() - data.writeTime) / 1000);
            let result;
            if (writeTime < 119){
                result = writeTime + " seconds";
            }
            if (writeTime >= 120 && writeTime < 7200){
                writeTime = Math.floor(writeTime / 60);
                result = writeTime + " minutes";
            }
            if (writeTime >= 7200){
                writeTime = Math.floor(writeTime / 7200);
                result = writeTime + " hours";
            }
            return domTpl[type]({ 
                action : data.action,
                afterTitle : data.afterTitle,
                beforeTitle : data.beforeTitle,
                cardName : data.cardName,
                writeTime : result });
        };

        userActions.forEach(element => {
            const allObj = { data: element, type: element.action };
            const historyItem = _dom.create({ type: 'div', className: ['menu-item', 'relative']});
            _dom.html(historyItem, createHTML(allObj));
            _dom.query('.menu-item-wrapper').prepend(historyItem);

            //_dom.addHTML(_dom.query('.menu-item-wrapper'), createHTML(allObj));
        });
    }
}

export default MenuView;