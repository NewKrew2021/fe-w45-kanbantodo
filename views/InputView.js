/*
    InputView.js : [+] 에 마우스를 가져다 댈 때 나오는 input-view
    - 모델 객체를 주입받고 구독하는 [Observer] 이다.
    - 구독중인 모델의 어떤 상태가 변경되면 -> 화면의 변화 발생(렌더링)하도록 한다.
    Add 버튼을 눌러 데이터를 추가하고 state가 변경되면 그 값을 받는다.
    
        * inputBtn.addEventListener("click", ({target})=>
        { this.todoModel.notify({ action : "NEW_TODO", data : target.value }); );
*/

/* TodoModel을 구독하는 Observer */
class InputView{
    constructor(subject){
        this.subject = subject; // 생성 시 구독할 model을 주입받고 구독한다.
        //this.model.subscribe(this.)
    }

    // update
}

export default InputView;