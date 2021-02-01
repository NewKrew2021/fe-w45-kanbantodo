class ActivityView {
  constructor(model){
    this.model = model;
  }

  showActivityBoard(activities) {
    console.log(activities);
    // let contentHtml = ``;
    // todos.forEach(todo => {
    //   contentHtml += `
    //     <div class="todo-container">
    //       <div class="todo-title">
    //         <div class="title-li title-img">
    //           <svg class="svg-class">
    //             <circle cx="13" cy="13" r="13" fill="#c9cdd3" />
    //           </svg>
    //         </div>
    //         <div class="title-li title-number">${todo.cards.length}</div>
    //         <div class="title-li title-text">${todo.title}</div>
    //         <div class="title-li title-add">+</div>
    //         <div class="title-li title-delete">✕</div>
    //       </div>
    //       <div class="todo-add non-display">
    //         <input type="text" class="add-input"></input>
    //         <button class="add-button" type="button">Add</button>
    //         <button class="cancel-button" type="button">Cancel</button>
    //       </div>
    //       <div class="item-container"></div>
    //     </div>
    //   `
    // });
    // contents.innerHTML = contentHtml;
  }
  
  init() {
    console.log(this.model);
    this.model.subscribe(this.showActivityBoard);
    this.model.getData();
  }
}

export {ActivityView};