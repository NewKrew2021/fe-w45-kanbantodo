class InputView {
  constructor(model){
    this.model = model;
    this.inputValue = "";
  }

  plusBtnEvent() {
    const plusBtn = document.querySelectorAll("div.title-add");
    plusBtn.forEach( btn => {
      btn.addEventListener("click", e => {
        const parentEle = e.currentTarget.closest(".todo-container");
        this.model.displayInputWindow(this.displayInputWindow, this.addCard, parentEle.childNodes[3]);
        this.addBtnEvent();
        this.cancelBtnEvent();
      })
    })
  }

  addBtnEvent() {
    const addBtn = document.querySelectorAll("button.add-button");
    addBtn.forEach( btn => {
      btn.addEventListener("click", e => {
        const parentEle = e.currentTarget.closest(".todo-container");
        const inputValue = parentEle.querySelector("input.add-input").value;
        this.inputValue = inputValue;
        this.model.addBtn(parentEle, inputValue);
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

  addCard(element, inputValue) {
    element.innerHTML += cardsHtml(inputValue);
    console.log(element, inputValue);
  }


  displayInputWindow(ele) {
    ele.className = "todo-add";
  }
  
  init() {
  }
}

const displayCard = (cards) => {
  const contents = document.querySelectorAll("div.todo-container");
  for(let idx=0; idx<cards.length; idx++) {
    let cardsHtml = ``;
    cards[idx]["items"].forEach(card => {
      // console.log(card)
      cardsHtml += `
        <div class="todo-contents">
          <div class="todo-items">
            ${card.title}
            <div class="todo-author"> Added by ${card.author}</div>
          </div>
        </div>
      `
    });
    contents[idx].innerHTML += cardsHtml;
  }
}

const cardsHtml = (title) => `
        <div class="todo-contents">
          <div class="todo-items">
            ${title}
            <div class="todo-author"> Added by kevin</div>
          </div>
        </div>
      `




export {InputView};