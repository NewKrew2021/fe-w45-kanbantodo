class CardView {
  constructor(model){
    this.model = model;
    this.inputValue = "";
  }

  displayCard(cards) {
    const contents = document.querySelectorAll("div.item-container");
    for(let idx=0; idx<cards.length; idx++) {
      let cardsHtml = ``;
      cards[idx]["cards"].forEach(card => {
        cardsHtml += `
          <div class="todo-contents">
            <div class="todo-cards">
              <div class="card-title">${card.title}</div>
              <div class="remove-card">✕</div>
              <div class="todo-author"> Added by ${card.author}</div>
            </div>
          </div>
        `
      });
      contents[idx].innerHTML = cardsHtml;
    }
    this.removeCardBtnEvent();
    this.moveCardEvent();
  }

  plusBtnEvent() {
    const plusBtn = document.querySelectorAll("div.title-add");
    plusBtn.forEach( btn => {
      btn.addEventListener("click", e => {
        const parentEle = e.currentTarget.closest(".todo-container");
        this.model.displayInputWindow(this.displayInputWindow, parentEle.childNodes[3]);
      })
    })
  }

  addBtnEvent() {
    const addBtn = document.querySelectorAll("button.add-button");
    addBtn.forEach( (btn, idx) => {
      btn.addEventListener("click", e => {
        const parentEle = e.currentTarget.closest(".todo-container");
        const inputValue = parentEle.querySelector("input.add-input").value;
        this.inputValue = inputValue;
        this.model.addCards(idx, inputValue);
      })
    })
  }

  cancelBtnEvent() {
    const cancelBtn = document.querySelectorAll("button.cancel-button");
    cancelBtn.forEach( btn => {
      btn.addEventListener("click", e => {
        const parentEle = e.currentTarget.closest(".todo-add");
        parentEle.className = "todo-add non-display"
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
    const removeCardBtn = document.querySelectorAll("div.todo-cards");
    let gapX, gapY, isMoveCard = false;
    removeCardBtn.forEach(btn => {
      btn.addEventListener("mousedown", (event) => {
        isMoveCard = true;
        gapX = event.clientX - btn.getBoundingClientRect().left;
        gapY = event.clientY - btn.getBoundingClientRect().top;
      });
      btn.addEventListener("mouseup", () => {isMoveCard = false});
      btn.addEventListener("mousemove", event => {
        if(isMoveCard){
          btn.style = `position: fixed; left: ${event.clientX-gapX}px; top: ${event.clientY-gapY}px;`
        }
      })
    })
  }

  displayInputWindow(ele) {
    ele.className = "todo-add";
  }
  
  init() {
    this.model.subscribe(this.displayCard.bind(this));
    this.model.getCardData()
    .then(this.plusBtnEvent.bind(this))
    .then(this.addBtnEvent.bind(this))
    .then(this.cancelBtnEvent.bind(this))
    .then(this.removeCardBtnEvent.bind(this));
  }
}



export {CardView};