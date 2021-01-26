/*
    ListView.js : card에 존재하는 여러 개의 리스트 뷰들
    모델을 구독하는 Observer
    구독중인 모델의 어떤 상태가 변경되면 -> 화면의 변화 발생(렌더링)
    데이터가 새롭게 추가되면 구독 중인 ListView가 감지한다.
*/
import domTpl from './template.js';
import * as _dom from '../src/util.js';

/* TodoModel을 구독하는 Observer */
class ListView{
    constructor(model){
        this.model = model; // 생성 시 구독할 model(여기서는 TodoModel)을 주입받고 구독한다.
        this.model.subscribe(this.update.bind(this))
    }

    // update(모델에 데이터가 추가되면, 상태값을 토대로 리스트뷰 업데이트 하기)
    update(state){
        //title, task, author
    }

    // event listener 정의

    // template로 html 넣기
    async render(){
        const data = await this.model.getInitialData(); // 초기 데이터를 가져온다.
        
        data.forEach(element => {
            const id = element.id;
            console.log(element);
        });
    }

    init(){

    }
}

export default ListView;