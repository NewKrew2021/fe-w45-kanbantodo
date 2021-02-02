/*
    menuView.ts
    우측 사이드 메뉴바 부분
*/
import * as _dom from "../src/util"
import TodoModel from "../models/TodoModel"

const SPEED = "500ms";

interface Menu{
    model: TodoModel
    speed: string
    width: string
}

class MenuView{
    model: TodoModel
    speed: string
    width: string
    menuBar: HTMLElement
    constructor({model, speed, width} : Menu){
        this.model = model;
        this.speed = speed;
        this.width = width;
        this.model.subscribe(this.update.bind(this))
        this.menuBar = _dom.query('.menu-wrapper');
    }

    // TodoModel의 상태값 변경 시, 기록이 남도록
    update(){
        this.onEvents();
        this.testState();
    }

    onEvents(){
        this.showMenuBar();
        this.closeMenuBar();
    }

    init(){
        this.showMenuBar();
        this.closeMenuBar();
    }

    // menuBar hover Event
    showMenuHandler(){
        this.menuBar.style.transition = this.speed;
        this.menuBar.style.transform = "translate(0, 0)";
    }
    closeMenuHandler(){
        this.menuBar.style.transform = `translate(${this.width}, 0)`;
    }
    showMenuBar(){
        const menuBtn = _dom.query('#menuBtn');
        this.menuBar.style.transform = `translate(${this.width}, 0)`;
        menuBtn.addEventListener('click', this.showMenuHandler.bind(this));
    }
    closeMenuBar(){
        const menuCloseBtn = _dom.query('.menu-close');
        menuCloseBtn.addEventListener('click', this.closeMenuHandler.bind(this));
    }

    // db에 기록하는 함수
    testState(){
        console.log(this.model.todos);
    }
}

export default MenuView;