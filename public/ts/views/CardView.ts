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
        this.model.addCards(titleText, inputValue);
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
        this.model.deleteCard(titleText, cardTitle);
        this.activityModel.addActivity("deleted", titleText, "none", cardTitle, "kevin", Date.now());
      })
    })
  }

  moveCardEvent() {
    let prevEle:HTMLElement, curEle:HTMLElement, copyEle:any, elePos: Array<any> = [];
    let prevIdx: number, moveIdx: number, newCardIdx:number;
    const todoContainerEle = document.querySelectorAll("div.todo-container");
    const contentsEle = document.querySelector("div.contents") as HTMLTextAreaElement;
    todoContainerEle.forEach((todo, index) => {
      const pos = todo.getBoundingClientRect();
      elePos.push({left:pos.left, right:pos.right, top:pos.top, bottom:pos.bottom, idx:index})
    })
    let gapX:number, gapY:number, isMoveCard:boolean = false;
    document.addEventListener("mousedown", event => {
      const eventEle = event.target as HTMLTextAreaElement;
      const card = eventEle.className;
      if(card==="todo-cards" || card==="todo-author" || card==="card-title"){
        prevEle = eventEle.closest(".todo-container") as HTMLTextAreaElement;
        const itemEle = prevEle.querySelector("div.item-container") as HTMLTextAreaElement;
        const cards = prevEle.querySelectorAll(".todo-cards");
        newCardIdx =this.getCardIndex(cards, copyEle, event);
        curEle = eventEle.closest("div.todo-cards") as HTMLTextAreaElement;
        copyEle = curEle.cloneNode(true);
        curEle.classList.add("opacity-on")
        contentsEle.appendChild(copyEle);

        copyEle.setAttribute("style", `position: fixed; left: ${event.clientX-gapX}px; top: ${event.clientY-gapY}px;`);
        isMoveCard = true;
        gapX = event.clientX - curEle.getBoundingClientRect().left;
        gapY = event.clientY - curEle.getBoundingClientRect().top;
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
          if(this.checkDifferentEle(event, pos)){
            const btnEle = cardEle.closest("div.todo-cards") as HTMLTextAreaElement;
            const cardTitleEle = btnEle.querySelector("div.card-title") as HTMLTextAreaElement;
            const card = cardTitleEle.innerHTML;
            const prevElement = todoContainerEle[prevIdx] as HTMLTextAreaElement;
            const prevTitle = prevElement.querySelector("div.title-text") as HTMLTextAreaElement;
            const prevTitleText = prevTitle.innerHTML;
            const curElement = todoContainerEle[pos.idx] as HTMLTextAreaElement;
            const curTitle = curElement.querySelector("div.title-text") as HTMLTextAreaElement;
            const curTitleText = curTitle.innerHTML;
            contentsEle.removeChild(copyEle);
            this.model.moveCards(prevTitleText, curTitleText, card, moveIdx, newCardIdx);
            this.activityModel.addActivity("moved", prevTitleText, curTitleText, card, "kevin", Date.now());
          }
        })
      }
    })
    document.addEventListener("mousemove", event => {
      if(isMoveCard){
        copyEle.setAttribute("style", `position: fixed; left: ${event.clientX-gapX}px; top: ${event.clientY-gapY}px;`);
        elePos.forEach( pos => {
          if(this.checkDifferentEle(event, pos)){
            const curElement = todoContainerEle[pos.idx] as HTMLTextAreaElement;
            const itemElement = curElement.querySelector(".item-container") as  HTMLTextAreaElement;
            if(moveIdx !== pos.idx) {
              moveIdx = pos.idx;
              itemElement.appendChild(curEle);
            }
            const cards = curElement.querySelectorAll("div.todo-cards");
            newCardIdx =this.getCardIndex(cards, copyEle, event);
            if(newCardIdx === -1 && !this.checkDifferentEle(event, itemElement.getBoundingClientRect())) {
              newCardIdx=cards.length-1;
            }
            if(newCardIdx !== -1) {
              if(newCardIdx < cards.length - 1) cards[newCardIdx].before(curEle);
              else if(newCardIdx < cards.length){
                cards[cards.length-1].after(curEle);
                newCardIdx=cards.length-1;
              } 
            }
          }
        })
      }
    })
  }

  getCardIndex(cards:NodeList, copyEle:HTMLElement, event:any):number {
    let idx:number=-1;
    cards.forEach( (card, index) => {
      if(card === copyEle) return ;
      const pos = card.getBoundingClientRect();
      if(this.checkDifferentEle(event, pos)){
        idx = index;
      }
    })
    return idx;
  }

  checkDifferentEle(event:any, pos:any) {
    if(event.clientX >= pos.left && event.clientX <= pos.right && event.clientY >= pos.top && event.clientY <= pos.bottom) return true;
    return false;
  }

  displayInputWindow(ele:HTMLElement) {
    ele.classList.remove("non-display");
  }
  nonDisplayInputWindow(ele:HTMLElement) {
    ele.classList.add("non-display");
  }
  
  init() {
    this.model.subscribe(this.displayCard.bind(this));
    this.model.getCard()
    .then(this.plusBtnEvent.bind(this))
    .then(this.addBtnEvent.bind(this))
    .then(this.cancelBtnEvent.bind(this))
    .then(this.moveCardEvent.bind(this));
  }
}

export {CardView};