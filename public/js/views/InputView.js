class InputView {
  constructor(model){
    this.model = model;
    this.inputValue = "";
    this.cardview;
  }

  displayCard(cards) {
    console.log(cards);
    const contents = document.querySelectorAll("div.item-container");
    for(let idx=0; idx<cards.length; idx++) {
      let cardsHtml = ``;
      cards[idx]["items"].forEach(card => {
       
        cardsHtml += `
          <div class="todo-contents">
            <div class="todo-items">
              ${card.title}
              <div class="todo-author"> Added by ${card.author}</div>
            </div>
          </div>
        `
      });
      contents[idx].innerHTML = cardsHtml;
    }
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
      btn.addEventListener("click", e=> {
        const parentEle = e.currentTarget.closest(".todo-add");
        parentEle.className = "todo-add non-display"
      })
    }) 
  }

  displayInputWindow(ele) {
    ele.className = "todo-add";
  }
  
  init() {
    this.model.subscribe(this.displayCard);
    this.model.getInitialData()
    .then(this.plusBtnEvent.bind(this))
    .then(this.addBtnEvent.bind(this))
    .then(this.cancelBtnEvent.bind(this))
  }
}




export {InputView};