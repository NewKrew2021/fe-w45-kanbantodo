/*
    ListView.js : card에 존재하는 여러 개의 리스트 뷰들
    모델을 구독하는 Observer
    구독중인 모델의 어떤 상태가 변경되면 -> 화면의 변화 발생(렌더링)

    데이터가 새롭게 추가되면 구독 중인 ListView가 감지한다.
*/

/* TodoModel을 구독하는 Observer */
class ListView{
    constructor(model){
        this.model = model; // 생성 시 구독할 model을 주입받고 구독한다.
        //this.model.subscribe(this.)
    }

    // update
}

export default ListView;