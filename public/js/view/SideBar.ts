import {Activity} from "../model/activityModel";
import {initActivityController} from"../controller/activityController.ts";

export function initActivity(){

    render();
    initEvents();
    initActivityController();

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

    const html=activityListData.reduce((acc,cur)=>{
        return acc+
        `<div class="side-item">
            <div>${getTextHTML(cur)}</div>
            <div>${getTimePast(cur.time)}</div>
        </div>`
    },"");

    activityList.innerHTML=html;

}

function getTextHTML(activity:Activity){
    const {author,title,sectionName,action}=activity;

    if(action=="add"){
        return `<span class="blue bold">@${author}</span> added <span class ="blue bold">${title}</span> to <span class="bold">${sectionName}</span>`;
    }else if(action=="update"){
        return `<span class="blue bold">@${author}</span> updated <span class ="blue bold">${title}</span> on <span class="bold">${sectionName}</span>`;
    }else if(action=="delete"){
        return `<span class="blue bold">@${author}</span> deleted <span class ="blue bold">${title}</span> from <span class="bold">${sectionName}</span>`;
    }

}
function getTimePast(createdTime:number){
    const now=Date.now();
    let diff=Math.floor((now-createdTime)/1000); // difference as seconds

    const days=Math.floor(diff/(24*60*60));
    if(days>0) return `${days} days ago`;
    
    diff=diff%(24*60*60);
    const hours=Math.floor(diff/(60*60));
    if(hours>0) return `${hours} hours ago`;
    
    diff=diff%(60*60);
    const mins=Math.floor(diff/(60));
    if(mins>0) return `${mins} mins ago`;
    
    
    diff=diff%(60);
    const seconds=diff;
    if(seconds>0) return `${seconds} seconds ago`;

    return `just now`;
}