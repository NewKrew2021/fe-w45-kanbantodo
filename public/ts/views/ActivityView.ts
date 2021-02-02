class ActivityView {
  model: any;
  constructor(model: any){
    this.model = model;
  }

  showActivityBoard(activities: Array<any>) {
    const activityContainer = document.querySelector("div.activity-contents") as HTMLTextAreaElement;
    const activitiesHtml = activities.reduceRight( (initHtml, activity) => {
      let activityHtml = `        
          <div class="activity-item">
          <img class="user-img" src="https://avatars.githubusercontent.com/u/26708382?s=460&u=60d666fedabd8d2e0cb2a589c0dec79bf1363fb3&v=4"></img>
            <div class="item-title">
              <span class="item-bold">@${activity.author}</span>
        `;
      switch(activity.type) {
        case 'added':
          activityHtml += `
            <span>${activity.type}</span>
            <span class="item-bold"> ${activity.text}</span>
            <span> to ${activity.to} </span>
          `
          break;
        case 'deleted':
          activityHtml += `
            <span>${activity.type}</span>
            <span class="item-bold"> ${activity.text}</span>
            <span> from ${activity.from} </span>
          `
          break;
        case 'moved':
          activityHtml += `
            <span>${activity.type}</span>
            <span class="item-bold"> ${activity.text}</span>
            <span> from ${activity.from} </span>
            <span> to ${activity.to} </span>
          `
          break;
        case 'updated':
          activityHtml += `
            <span>${activity.type}</span>
            <span class="item-bold"> ${activity.text}</span>
          `
      }
      let timeText = 'seconds';
      let timeGap = (Date.now() - activity.time)/1000;
      
      if(timeGap >= 86400){
        timeGap /= 86400;
        timeText = 'days'
      } else if(timeGap >= 3600){
        timeGap /= 3600;
        timeText = 'hours'
      } else if(timeGap >= 60){
        timeGap /= 60;
        timeText = 'minutes'
      }
      return initHtml += activityHtml + ` 
          </div>
          <div class="item-timelog">${Math.floor(timeGap)} ${timeText} ago</div>
        </div>
      `
    }, ``)
    activityContainer.innerHTML = activitiesHtml;
  }

  menuEventHandler() {
    const menuBtn = document.querySelector("div.navbar-menu") as HTMLTextAreaElement;
    const activityEle = document.querySelector("div.activity-container") as HTMLTextAreaElement;
    menuBtn.addEventListener("click", e => {
      this.displayActivityBoard(activityEle);
    })
  }

  cancelEventHandler() {
    const cancelBtn = document.querySelector("span.activity-close") as HTMLTextAreaElement;
    const activityEle = document.querySelector("div.activity-container") as HTMLTextAreaElement;
    cancelBtn.addEventListener("click", e => {
      this.nonDisplayActivityBoard(activityEle);
    })
  }

  clearEventHandler() {
    const clearBtn = document.querySelector("span.activity-clear") as HTMLTextAreaElement;
    clearBtn.addEventListener("click", e => {
      this.model.clearActivity();
    })
  }

  displayActivityBoard(ele:Element) {
    ele.classList.remove("non-display");
    ele.classList.remove("activity-out");
    ele.classList.add("activity-in");
  }

  nonDisplayActivityBoard(ele:Element) {
    ele.classList.remove("activity-in");
    ele.classList.add("activity-out");
  }
  
  init() {
    this.model.subscribe(this.showActivityBoard);
    this.model.getData()
    .then(() => {
      this.menuEventHandler();
      this.cancelEventHandler();
      this.clearEventHandler();
    });
  }
}

export {ActivityView};