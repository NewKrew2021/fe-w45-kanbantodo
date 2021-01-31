class CardView {
  constructor(model){
    this.model = model;
  }

  displayCard(cards) {
    const cardCnt = document.querySelectorAll("div.title-number");
    const itemContainerEle = document.querySelectorAll("div.item-container");
    for(let idx=0; idx<cards.length; idx++) {
      const initHtml = ``;
      const cardsHtml = cards[idx]["cards"].reduce((initHtml, card) => {
        return initHtml += `
        <div class="todo-contents">
          <div class="todo-cards" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
            <div class="card-title">${card.title}</div>
            <div class="remove-card">✕</div>
            <div class="todo-author"> Added by ${card.author}</div>
          </div>
        </div>
      `
      }, initHtml)
      itemContainerEle[idx].innerHTML = cardsHtml;
      cardCnt[idx].innerHTML = cards[idx]["cards"].length;
    }
    this.removeCardBtnEvent();
  }

  plusBtnEvent() {
    const plusBtn = document.querySelectorAll("div.title-add");
    plusBtn.forEach( btn => {
      btn.addEventListener("click", e => {
        const parentEle = e.currentTarget.closest(".todo-container");
        const todoAdd = parentEle.querySelector("div.todo-add");
        this.model.subscribe(this.displayInputWindow);
        this.model.displayInputWindow(todoAdd);
        this.model.unSubscribe(this.displayInputWindow);
      })
    })
  }

  addBtnEvent() {
    const addBtn = document.querySelectorAll("button.add-button");
    addBtn.forEach( (btn, idx) => {
      btn.addEventListener("click", e => {
        const parentEle = e.currentTarget.closest(".todo-container");
        const inputEle = parentEle.querySelector("input.add-input");
        const inputValue = inputEle.value;
        inputEle.value = "";
        this.model.addCards(idx, inputValue);
      })
    })
  }

  cancelBtnEvent() {
    const cancelBtn = document.querySelectorAll("button.cancel-button");
    cancelBtn.forEach( btn => {
      btn.addEventListener("click", e => {
        const parentEle = e.currentTarget.closest(".todo-add");
        this.model.subscribe(this.nonDisplayInputWindow);
        this.model.cancelBtn(parentEle);
        this.model.unSubscribe(this.nonDisplayInputWindow);
      })
    }) 
  }

  removeCardBtnEvent() {
    const removeCardBtn = document.querySelectorAll("div.remove-card");
    removeCardBtn.forEach(btn => {
      btn.addEventListener("click", e => {
        const todoEle = e.currentTarget.closest(".item-container");
        const cardEle = e.currentTarget.closest(".todo-cards");
        const cardTitle = cardEle.querySelector("div.card-title").innerHTML;
        const elements = document.querySelectorAll("div.item-container");
        let idx = 0;
        elements.forEach( (ele, index) => { if(ele === todoEle) idx=index} );
        this.model.deleteCard(idx, cardTitle);
      })
    })
  }

  moveCardEvent() {
    let prevEle, prevIdx, curIdx, elePos = [];
    const todoContainerEle = document.querySelectorAll("div.todo-container");
    todoContainerEle.forEach((todo, index) => {
      const pos = todo.getBoundingClientRect();
      elePos.push({left:pos.left, right:pos.right, top:pos.top, bottom:pos.bottom, idx:index})
    })
    let gapX, gapY, isMoveCard = false;
    document.addEventListener("mousedown", event => {
      const card = event.target.className;
      if(card==="todo-cards" || card==="todo-author" || card==="card-title"){
        const btnEle = event.target.closest("div.todo-cards");
        prevEle = event.target.closest(".todo-container");
        isMoveCard = true;
        gapX = event.clientX - btnEle.getBoundingClientRect().left;
        gapY = event.clientY - btnEle.getBoundingClientRect().top;
        todoContainerEle.forEach((todo, index) => {
          if(todo === prevEle) curIdx=index;
        })
      }
    })

    document.addEventListener("mouseup", event => {
      const card = event.target.className;
      if(card==="todo-cards" || card==="todo-author" || card==="card-title"){
        isMoveCard = false;
        todoContainerEle.forEach((todo, index) => {
          if(todo === prevEle) prevIdx=index;
        })
        elePos.forEach( pos => {
          if(event.clientX >= pos.left && event.clientX <= pos.right &&
            event.clientY >= pos.top && event.clientY <= pos.bottom){
              const btnEle = event.target.closest("div.todo-cards");
              const card = btnEle.querySelector("div.card-title").innerHTML;
              this.model.moveCards(prevIdx, pos.idx, card);
          }
        })
      }
    })

    document.addEventListener("mousemove", event => {
      if(isMoveCard){
        const btnEle = event.target.closest("div.todo-cards");
        btnEle.style = `position: fixed; left: ${event.clientX-gapX}px; top: ${event.clientY-gapY}px;`
      }
    })

  }

  displayInputWindow(ele) {
    ele.classList.remove("non-display");
  }
  nonDisplayInputWindow(ele) {
    ele.classList.add("non-display");
  }
  
  init() {
    this.model.subscribe(this.displayCard.bind(this));
    this.model.getCardInit()
    .then(this.plusBtnEvent.bind(this))
    .then(this.addBtnEvent.bind(this))
    .then(this.cancelBtnEvent.bind(this))
    .then(this.removeCardBtnEvent.bind(this))
    .then(this.moveCardEvent.bind(this));
  }
}



export {CardView};