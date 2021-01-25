/*
    InputView.js : [+] 에 마우스를 가져다 댈 때 나오는 input-view
    모델 객체를 주입받고 구독하는 Observer 이다.
    구독중인 모델의 어떤 상태가 변경되면 -> 화면의 변화 발생(렌더링)하도록 한다.
    
        * inputBtn.addEventListener("click", ({target})=>
        { this.todoModel.notify({ action : "NEW_TODO", data : target.value }); );
*/

export default function test(){
    return 'test';
}