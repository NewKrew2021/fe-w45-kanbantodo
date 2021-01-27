/*
    ListView.js : card에 존재하는 여러 개의 리스트 뷰들
    모델을 구독하는 Observer
    구독중인 모델의 어떤 상태가 변경되면 -> 화면의 변화 발생(렌더링)
    데이터가 새롭게 추가되면, 구독 중인 ListView가 감지한다.
*/
import { domTpl } from './template.js';
import * as _dom from '../src/util.js';
import * as req from '../src/request.js';

/* TodoModel을 구독하는 Observer */
class ListView{
    constructor(model){
        this.model = model; // 생성 시 구독할 model(여기서는 TodoModel)을 주입받고 구독한다.
        this.model.subscribe(this.update.bind(this))
    }

    // update(모델의 상태값이 변화(데이터 추가 혹은 삭제)되면, 리스트뷰 업데이트 하기)
    update(state){
        this.updateListView(state);
    }

    // 데이터를 가지고 view를 바로 렌더링하는 메서드
    updateListView(res){
        this.render();
        this.removeListView();
    }

    // template로 초기 html 넣기
    async render(){
        const data = await this.model.getInitialData(); // 초기 데이터를 가져온다.
        const createHTML = ({ data, type }) => data.reduce((acc, {id, name, author, data}) =>{
            return acc + domTpl[type]({id, name, author, data});
        }, ``);
        data.forEach(element => {
            const allObj = { data: element, type: 'InitListView'};
            _dom.html(_dom.query('.card-wrapper'), createHTML(allObj));
        });
    }

    /* event handler */
    removeListHandler(e){
        const cardId = e.currentTarget.getAttribute('data');
        const id = e.currentTarget.getAttribute('data-idx');
        this.model.removeTodo({cardId, id});
    }

    // 리스트뷰의 X 클릭 시 삭제하는 메서드
    async removeListView() {
        const { } = await this.model.getInitialData();
        const removeListBtn = _dom.queryAll('.list-remove');
        removeListBtn.forEach(element => {
            element.addEventListener('click', this.removeListHandler.bind(this));
        })
    }

    init(){
        this.render();
        this.removeListView();
    }
}

export default ListView;