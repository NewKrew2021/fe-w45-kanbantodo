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
class ListView {
    constructor(model) {
        this.modal = _dom.query('.modal');
        this.removeModal = _dom.query('.modal-remove');
        this.editModal = _dom.query('.modal-edit');
        this.modalSaveBtn = _dom.query('.btn-save-modal');
        this.modalAcceptBtn = _dom.query('.btn-accept-modal');
        this.modalCloseBtn = _dom.query('.btn-close-modal');
        this.model = model; // 생성 시 구독할 model(여기서는 TodoModel)을 주입받고 구독한다.
        this.model.subscribe(this.update.bind(this))
    }

    // update(모델의 상태값이 변화(데이터 추가 혹은 삭제)되면, 리스트뷰 업데이트 하기)
    update(state) {
        this.updateListView(state);
    }

    // 데이터를 가지고 view를 바로 렌더링하는 메서드
    updateListView(res) {
        this.render();
        this.removeListView();
        this.editListView();
    }

    // template로 초기 html 넣기
    async render() {
        const data = await this.model.getInitialData(); // 초기 데이터를 가져온다.
        const createHTML = ({ data, type }) => data.reduce((acc, { id, name, author, data }) => {
            return acc + domTpl[type]({ id, name, author, data });
        }, ``);
        data.forEach(element => {
            const allObj = { data: element, type: 'InitListView' };
            _dom.html(_dom.query('.card-wrapper'), createHTML(allObj));
        });
    }

    /* drag and drop */
    /* (1) mousedown - 움직이는 대상 준비
       (2) mousemove - position:absolute, left-top 변경
       (3) mouseup - 드래그 앤 드롭 완료 후 관련 작업 수행
    */
    async dragDownHandler(e) {
        if (e.target !== e.currentTarget) return;
        const cardId = e.currentTarget.getAttribute('data');
        const copiedNode = e.currentTarget.cloneNode(true);
        copiedNode.style.opacity = 0.4;
        _dom.queryAll('.list-view-wrapper').forEach(element =>{
            if(element.getAttribute('data') === cardId){
                element.insertBefore(copiedNode, e.currentTarget);
            }
        })
        let shiftX = e.screenX - e.currentTarget.getBoundingClientRect().left;
        let shiftY = e.screenY - e.currentTarget.getBoundingClientRect().bottom;
        //console.log(shiftX, shiftY);
        e.target.style.position = 'absolute';
        e.target.style.zIndex = 1000;
        document.body.append(e.target);

        moveAt(e.pageX, e.pageY);
        function moveAt(pageX, pageY) {
            e.target.style.left = pageX - shiftX + 'px';
            e.target.style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
        // mousemove -> 드래그하면서 움직이기
        document.addEventListener('mousemove', onMouseMove);
    }

    async dragAndDrop() {
        const { } = await this.model.getInitialData();
        const note = _dom.queryAll('.list-view');
        note.forEach(element => {
            element.addEventListener('mousedown', this.dragDownHandler.bind(this));
        })
        note.forEach(element => {
            element.addEventListener('mouseup', () => {
               // document.removeEventListener('mousemove', onMouseMove);
            });
        })
    }

    /* event handler */
    async removeListHandler(e) {
        const cardId = e.target.getAttribute('data');
        const id = e.target.getAttribute('data-idx');
        await this.model.setModalState({ cardId, id });
        this.modal.classList.remove('none');
        this.removeModal.classList.remove('none');

        this.modalAcceptBtn.addEventListener('click', function () {
            this.model.removeTodo(this.model.state);
            this.modal.classList.add('none');
            this.removeModal.classList.add('none');
        }.bind(this))
        this.modalCloseBtn.addEventListener('click', () => {
            this.modal.classList.add('none');
            this.removeModal.classList.add('none');
        })
    }
    // 리스트뷰의 X 클릭 시 삭제하는 메서드
    async removeListView() {
        const { } = await this.model.getInitialData();
        const removeListBtn = _dom.queryAll('.list-remove');
        removeListBtn.forEach(element => {
            element.addEventListener('click', this.removeListHandler.bind(this));
        })
    }

    /* event handler */
    async editListHandler(e) {
        const cardId = e.currentTarget.getAttribute('data');
        const id = e.currentTarget.getAttribute('data-idx');
        const modalInput = _dom.query('.modal-input');
        await this.model.setModalState({ cardId, id });
        this.modal.classList.remove('none');
        this.editModal.classList.remove('none');

        this.modalSaveBtn.addEventListener('click', function () {
            const newTitle = modalInput.value;
            const input = { input: { title: newTitle } };
            this.model.editTodo({ ...this.model.state, input });
            this.modal.classList.add('none');
            this.editModal.classList.add('none');
        }.bind(this))
    }

    // 리스트뷰(note item) 더블 클릭 시 타이틀을 수정하는 메서드
    async editListView() {
        const { } = await this.model.getInitialData();
        const note = _dom.queryAll('.list-view');
        const closeBtn = _dom.query('.btn-edit-close-modal');
        note.forEach(element => {
            element.addEventListener('dblclick', this.editListHandler.bind(this));
        })
        closeBtn.addEventListener('click', () => {
            this.modal.classList.add('none');
            this.editModal.classList.add('none');
        })
    }

    init() {
        this.render();
        this.removeListView();
        this.editListView();
        this.dragAndDrop();
    }
}

export default ListView;