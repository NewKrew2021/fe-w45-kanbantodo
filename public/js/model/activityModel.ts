import { renderActivityList } from "../view/SideBar.ts";

let activityList:Activity[]=[];
export interface Activity{
    author:string,
    action:string,
    title:string,
    sectionName:string,
    time:number;
    newTitle?:string,
    newSectionName?:string
}

export function addActivity(newActivity:Activity){
    activityList=[newActivity,...activityList]
    renderActivityList(activityList);
}
export async function fetchActivities() {
    try{
        const res = await fetch(`/activities?`, { 
            method: 'GET', 
        });
        const data=await res.json();
        activityList=data.tasks;
        activityList.sort((a,b)=>
            ( (a.time < b.time) ? 1:-1) // 시간값 기준 내림차순 정렬(최근 만들어진 레코드가 먼저오게끔)
        );
        renderActivityList(activityList);
    }catch(err){
        console.error(err);
    }

}
