import { renderActivityList } from "../view/SideBar.ts";

let activityList:Activity[]=[];
export interface Activity{
    action:string,
    title:string,
    sectionName:string,
    newTitle?:string,
    newSectionName?:string
}

export function addActivity(newActivity:Activity){
    activityList=[...activityList,newActivity]
    renderActivityList(activityList);
}
export async function fetchActivities() {
    try{
        const res = await fetch(`/activities?`, { 
            method: 'GET', 
        });
        const data=await res.json();
        activityList=data.tasks;
        renderActivityList(activityList);
    }catch(err){
        console.error(err);
    }

}
