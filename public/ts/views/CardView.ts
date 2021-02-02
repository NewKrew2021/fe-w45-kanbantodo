class CardView {
  model: any;
  activityModel: any;
  constructor(model: any, activityModel: any){
    this.model = model;
    this.activityModel = activityModel;
  }

  displayCard(cards: Array<any>) {
    const cardCnt = document.querySelectorAll("div.title-number");
    const itemContainerEle = document.querySelectorAll("div.item-container");
    for(let idx=0; idx<cards.length; idx++) {
      const cardsHtml = cards[idx]["cards"].reduce((initHtml:string, card:any) => {
        return initHtml += `
        <div class="todo-contents">
          <div class="todo-cards" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
            <div class="card-title">${card.title}</div>
            <div class="remove-card">✕</div>
            <div class="todo-author"> Added by ${card.author}</div>
          </div>
        </div>
      `
      },``)
      itemContainerEle[idx].innerHTML = cardsHtml;
      cardCnt[idx].innerHTML = cards[idx]["cards"].length;
    }
    this.removeCardBtnEvent();
  }

  plusBtnEvent() {
    const plusBtn = document.querySelectorAll("div.title-add");
    plusBtn.forEach( btn => {
      btn.addEventListener("click", event => {
        const eventEle = event.currentTarget as HTMLTextAreaElement;
        const parentEle = eventEle.closest(".todo-container") as HTMLTextAreaElement;
        const todoAdd = parentEle.querySelector("div.todo-add");
        this.model.subscribe(this.displayInputWindow);
        this.model.displayInputWindow(todoAdd);
        this.model.unSubscribe(this.displayInputWindow);
      });
    })
  }

  addBtnEvent() {
    const addBtn = document.querySelectorAll("button.add-button");
    addBtn.forEach( (btn, idx) => {
      btn.addEventListener("click", event => {
        const eventEle = event.currentTarget as HTMLTextAreaElement;
        const parentEle = eventEle.closest(".todo-container") as HTMLTextAreaElement;
        const parentTitle = parentEle.querySelector("div.title-text") as HTMLTextAreaElement;
        const titleText = parentTitle.innerHTML;
        const inputEle = parentEle.querySelector("input.add-input") as HTMLTextAreaElement;
        const inputValue = inputEle.value;
        inputEle.value = "";
        this.model.addCards(idx, inputValue);
        this.activityModel.addActivity("added", "none", titleText, inputValue, "kevin", Date.now());
      })
    })
  }

  cancelBtnEvent() {
    const cancelBtn = document.querySelectorAll("button.cancel-button");
    cancelBtn.forEach( btn => {
      btn.addEventListener("click", event => {
        const eventEle = event.currentTarget as HTMLTextAreaElement;
        const parentEle = eventEle.closest(".todo-add") as HTMLTextAreaElement;
        this.model.subscribe(this.nonDisplayInputWindow);
        this.model.cancelBtn(parentEle);
        this.model.unSubscribe(this.nonDisplayInputWindow);
      })
    }) 
  }

  removeCardBtnEvent() {
    const removeCardBtn = document.querySelectorAll("div.remove-card");
    removeCardBtn.forEach(btn => {
      btn.addEventListener("click", event => {
        const eventEle = event.currentTarget as HTMLTextAreaElement;
        const todoEle = eventEle.closest(".todo-container") as HTMLTextAreaElement;
        const todoTitleEle = todoEle.querySelector("div.title-text") as HTMLTextAreaElement;
        const titleText = todoTitleEle.innerHTML;
        const cardEle = eventEle.closest(".todo-cards") as HTMLTextAreaElement;
        const cardTitleEle = cardEle.querySelector("div.card-title") as HTMLTextAreaElement;
        const cardTitle = cardTitleEle.innerHTML;
        const elements = document.querySelectorAll("div.todo-container");
        let idx = 0;
        elements.forEach( (ele, index) => { if(ele === todoEle) idx=index} );
        this.model.deleteCard(idx, cardTitle);
        this.activityModel.addActivity("deleted", titleText, "none", cardTitle, "kevin", Date.now());
      })
    })
  }

  moveCardEvent() {
    let prevEle:HTMLElement, prevIdx: number, curIdx: number, elePos: Array<any> = [];
    const todoContainerEle = document.querySelectorAll("div.todo-container");
    todoContainerEle.forEach((todo, index) => {
      const pos = todo.getBoundingClientRect();
      elePos.push({left:pos.left, right:pos.right, top:pos.top, bottom:pos.bottom, idx:index})
    })
    let gapX:number, gapY:number, isMoveCard:boolean = false;
    document.addEventListener("mousedown", event => {
      const eventEle = event.target as HTMLTextAreaElement;
      const card = eventEle.className;
      if(card==="todo-cards" || card==="todo-author" || card==="card-title"){
        const btnEle = eventEle.closest("div.todo-cards") as HTMLTextAreaElement;
        prevEle = eventEle.closest(".todo-container") as HTMLTextAreaElement;
        isMoveCard = true;
        gapX = event.clientX - btnEle.getBoundingClientRect().left;
        gapY = event.clientY - btnEle.getBoundingClientRect().top;
        todoContainerEle.forEach((todo, index) => {
          if(todo === prevEle) curIdx=index;
        })
      }
    })

    document.addEventListener("mouseup", event => {
      const cardEle = event.target as HTMLTextAreaElement;
      const card = cardEle.className;
      if(card==="todo-cards" || card==="todo-author" || card==="card-title"){
        isMoveCard = false;
        todoContainerEle.forEach((todo, index) => {
          if(todo === prevEle) prevIdx=index;
        })
        elePos.forEach( pos => {
          if(event.clientX >= pos.left && event.clientX <= pos.right &&
            event.clientY >= pos.top && event.clientY <= pos.bottom){
              const btnEle = cardEle.closest("div.todo-cards") as HTMLTextAreaElement;
              const cardTitleEle = btnEle.querySelector("div.card-title") as HTMLTextAreaElement;
              const card = cardTitleEle.innerHTML;
              const prevElement = todoContainerEle[prevIdx] as HTMLTextAreaElement;
              const prevTitle = prevElement.querySelector("div.title-text") as HTMLTextAreaElement;
              const prevTitleText = prevTitle.innerHTML;
              const curElement = todoContainerEle[pos.idx] as HTMLTextAreaElement;
              const curTitle = curElement.querySelector("div.title-text") as HTMLTextAreaElement;
              const curTitleText = curTitle.innerHTML

              this.model.moveCards(prevIdx, pos.idx, card);
              this.activityModel.addActivity("moved", prevTitleText, curTitleText, card, "kevin", Date.now());
          }
        })
      }
    })

    document.addEventListener("mousemove", event => {
      if(isMoveCard){
        const eventEle = event.target as HTMLTextAreaElement;
        const btnEle = eventEle.closest("div.todo-cards") as HTMLTextAreaElement;
        btnEle.setAttribute("style", `position: fixed; left: ${event.clientX-gapX}px; top: ${event.clientY-gapY}px;`);
      }
    })
  }

  displayInputWindow(ele:HTMLElement) {
    ele.classList.remove("non-display");
  }
  nonDisplayInputWindow(ele:HTMLElement) {
    ele.classList.add("non-display");
  }
  
  init() {
    this.model.subscribe(this.displayCard.bind(this));
    this.model.getCardInit()
    .then(this.plusBtnEvent.bind(this))
    .then(this.addBtnEvent.bind(this))
    .then(this.cancelBtnEvent.bind(this))
    .then(this.moveCardEvent.bind(this));
  }
}

export {CardView};