import {Activity} from "../model/activityModel";
import {initActivityController} from"../controller/activityController.ts";

export function initActivity(){

    render();
    initEvents();
    initActivityController();
    //renderActivityList();

}
function initEvents(){
    const menuBtn=document.querySelector("#menu");
    const sideBar=document.querySelector("#side-bar");
    menuBtn.addEventListener("click",()=>{
        const cl=sideBar.classList;
        if(cl.contains("sb-close")){
            cl.add("sb-open");
            cl.remove("sb-close");
        }else if(cl.contains("sb-open")){
            cl.remove("sb-open");
            cl.add("sb-close");
        }
    });
    const closeBtn=sideBar.querySelector("#close-btn");
    closeBtn.addEventListener("click",()=>{
        sideBar.classList.remove("sb-open");
        sideBar.classList.add("sb-close");
    });

}
function render(){
    const sideBar=document.querySelector("#side-bar");
    sideBar.classList.add("sb-close");
    const html=
    `
    <div id="title">
        <span>Menu</span>
        <span id="close-btn">X</span>
    </div>
    <div id="sub">Activity</div>
    <div id="activity-list"></div>
    `;

    sideBar.innerHTML=html;

};

export function renderActivityList(activityListData :Activity[]) {
    const sideBar=document.querySelector("#side-bar");
    const activityList=sideBar.querySelector("#activity-list");

    const html=activityListData.reduce((acc,{title})=>
        acc+`<div>${title}</div>`
    ,"");

    activityList.innerHTML=html;

}