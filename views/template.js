import * as dom from '../src/util.js';

export const domTpl = {
    listView({title, task, author}){
        return `<div class="list-view">
        <p class="title"><img src="/images/list_btn.png">${title}</p>
        ${task.forEach(element => {
            `<ul class="task sub-title font-15"><li>${element}</li></ul>`
        })}
        <p class="author sub-title font-15">Added by ${author}</p>
        <button class="close-btn"><img src="/images/close_btn.png"></button>
        </div>`
    }
};