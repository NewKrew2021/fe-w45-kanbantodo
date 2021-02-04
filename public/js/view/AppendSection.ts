import {createElementFromHTML} from"../util";

export function initAppendSection(){
    const kanban=document.querySelector("#kanban");
    const appendSection=createElementFromHTML(`<div id="append-section"> click here to make new column</div>`);
    appendSection.addEventListener("click",addSection);
    kanban.appendChild(appendSection);
}

export async function fetchSections(){
    try{
        const res = await fetch(`/section`, { 
            method: 'GET', 
        });
        const data=await res.json();
        const sectionList=data.sectionList;
        return sectionList;
    }catch(err){
        console.error(err);
    }
}


async function addSection(){
    try{
        const res = await fetch(`/section`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        
    }catch(err){
        console.error(err);
    }
}