class CardView {
  constructor(model){
    this.model = model;
  }

  displayCard(cards) {
    const cardCnt = document.querySelectorAll("div.title-number");
    const itemContainerEle = document.querySelectorAll("div.item-container");
    for(let idx=0; idx<cards.length; idx++) {
      let cardsHtml = ``;
      cards[idx]["cards"].forEach(card => {
        cardsHtml += `
          <div class="todo-contents">
            <div class="todo-cards" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
              <div class="card-title">${card.title}</div>
              <div class="remove-card">✕</div>
              <div class="todo-author"> Added by ${card.author}</div>
            </div>
          </div>
        `
      });
      itemContainerEle[idx].innerHTML = cardsHtml;
      cardCnt[idx].innerHTML = cards[idx]["cards"].length;
    }
    this.removeCardBtnEvent();
    this.moveCardEvent();
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
    const moveCardBtn = document.querySelectorAll("div.todo-cards");
    const todoContainerEle = document.querySelectorAll("div.todo-container");
    todoContainerEle.forEach((todo, index) => {
      const pos = todo.getBoundingClientRect();
      elePos.push({left:pos.left, right:pos.right, top:pos.top, bottom:pos.bottom, idx:index})
    })
    moveCardBtn.forEach(btn => {
      let gapX, gapY, isMoveCard = false;
      btn.addEventListener("mousedown", event => {
        if(event.target.className === "remove-card"){
          isMoveCard = false;
          return ;
        }
        isMoveCard = true;
        gapX = event.clientX - btn.getBoundingClientRect().left;
        gapY = event.clientY - btn.getBoundingClientRect().top;
        prevEle = event.target.closest(".todo-container");
        todoContainerEle.forEach((todo, index) => {
          if(todo === prevEle) curIdx=index;
        })
      });


      btn.addEventListener("mouseup", event => {
        if(event.target.className === "remove-card"){
          isMoveCard = false;
          return ;
        } 
        isMoveCard = false;
        todoContainerEle.forEach((todo, index) => {
          if(todo === prevEle) prevIdx=index;
        })
        elePos.forEach( pos => {
          if(event.clientX >= pos.left && event.clientX <= pos.right &&
            event.clientY >= pos.top && event.clientY <= pos.bottom){
              const card = event.currentTarget.querySelector("div.card-title").innerHTML
              this.model.moveCards(prevIdx, pos.idx, card);
          }
        })
      });


      document.addEventListener("mousemove", event => {
        if(isMoveCard){
          btn.style = `position: fixed; left: ${event.clientX-gapX}px; top: ${event.clientY-gapY}px;`
          elePos.forEach( pos => {
            if(event.clientX >= pos.left && event.clientX <= pos.right &&
              event.clientY >= pos.top && event.clientY <= pos.bottom){
                if(curIdx !== pos.idx){
                  // 위치 변경
                  // const card = event.currentTarget.querySelector("div.card-title").innerHTML
                  // this.model.moveCards(curIdx, pos.idx, card);
                  // curIdx = pos.idx;
                } 
            }
          })
        }
      })
    })
  }

  displayInputWindow(ele) {
    ele.className = "todo-add";
  }
  nonDisplayInputWindow(ele) {
    ele.className = "todo-add non-display";
  }
  
  init() {
    this.model.subscribe(this.displayCard.bind(this));
    this.model.getCardInit()
    .then(this.plusBtnEvent.bind(this))
    .then(this.addBtnEvent.bind(this))
    .then(this.cancelBtnEvent.bind(this))
    .then(this.removeCardBtnEvent.bind(this));
  }
}



export {CardView};