class ActivityView {
  constructor(model){
    this.model = model;
  }

  showActivityBoard(activities) {
    const activityContainer = document.querySelector("div.activity-contents");
    const initHtml = ``;
    
    const activitiesHtml = activities.reduce( (initHtml, activity) => {
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
    }, initHtml)
    activityContainer.innerHTML = activitiesHtml;
  }

  menuEventHandler() {
    const menuBtn = document.querySelector("div.navbar-menu");
    const activityEle = document.querySelector("div.activity-container");
    menuBtn.addEventListener("click", e => {
      this.displayActivityBoard(activityEle);
    })
  }

  cancelEventHandler() {
    const cancelBtn = document.querySelector("span.activity-close");
    const activityEle = document.querySelector("div.activity-container");
    cancelBtn.addEventListener("click", e => {
      this.nonDisplayActivityBoard(activityEle);
    })
  }

  displayActivityBoard(ele) {
    ele.classList.remove("non-display");
    ele.classList.remove("activity-out");
    ele.classList.add("activity-in");
  }

  nonDisplayActivityBoard(ele) {
    ele.classList.remove("activity-in");
    ele.classList.add("activity-out");
  }
  
  init() {
    this.model.subscribe(this.showActivityBoard);
    this.model.getData()
    .then(() => {
      this.model.unSubscribe(this.showActivityBoard);
      this.menuEventHandler();
      this.cancelEventHandler();
    });
  }
}

export {ActivityView};