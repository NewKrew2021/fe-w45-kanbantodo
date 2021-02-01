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
        this.modalWriteBtn = _dom.query('.btn-write-modal');
        this.modalAcceptBtn = _dom.query('.btn-accept-modal');
        this.modalCloseBtn = _dom.query('.btn-close-modal');
        this.cardsTitle = _dom.queryAll('.list-title')
        this.onMouseMoveHandler;
        this.curTarget;
        this.copiedNode;
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
        this.dragAndDrop();
        this.findListView();
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
        this.cardsTitle = _dom.queryAll('.list-title')

        // 맨 끝에 컬럼 추가기능 area 구현하기
        _dom.addHTML(_dom.query('.card-wrapper'), domTpl['NewColumn']())
    }

    /* drag and drop */
    /* (1) mousedown - 움직이는 대상 준비
       (2) mousemove - position:absolute, left-top 변경
       (3) mouseup - 드래그 앤 드롭 완료 후 관련 작업 수행
    */
    dragDownHandler(e) {
        if (e.target !== e.currentTarget) return;
        let curTarget = e.currentTarget;
        const copiedNode = e.currentTarget.cloneNode(true);
        copiedNode.style.opacity = 0.4;
        curTarget.parentNode.insertBefore(copiedNode, curTarget); // 기존 자리 잔상

        this.curTarget = curTarget;
        this.copiedNode = copiedNode;
        const eleInfo = e.currentTarget.getBoundingClientRect();
        let shiftX = e.clientX - eleInfo.left;
        let shiftY = e.screenY - eleInfo.bottom;
        e.target.style.position = 'absolute';
        e.target.style.zIndex = 1000;
        e.target.style.opacity = 0.7;
        document.body.append(e.target);

        moveAt(e.pageX, e.pageY);
        function moveAt(pageX, pageY) {
            e.target.style.left = pageX - shiftX + 'px';
            e.target.style.top = pageY - shiftY + 'px';
        }
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            curTarget.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            curTarget.hidden = false;
            if (!elemBelow) return;

            // 드랍 가능한 요소를 droppable 클래스로 지정
            let currentDroppable = null;
            let droppableBelow = elemBelow.closest('.droppable');
            if (currentDroppable != droppableBelow) {
                if (currentDroppable) {
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    enterDroppable(currentDroppable, elemBelow, copiedNode);
                }
            }
        }
        // elem은 가장 많이 겹치는 노드
        function enterDroppable(elem, elemBelow, copiedNode) {
            if (!!elem.nextSibling && !elem.parentNode.classList.contains('card-wrapper')) {
                elem.parentNode.insertBefore(copiedNode, elem);
            }
            if (elemBelow.classList.contains('card')) {
                elemBelow.children[1].children[1].appendChild(copiedNode);
            }
        }
        function leaveDroppable(elem) {
            elem.style.background = '';
        }
        // mousemove -> 드래그하면서 움직이기
        this.onMouseMoveHandler = onMouseMove;
        document.addEventListener('mousemove', this.onMouseMoveHandler);
    }

    dropUpHandler(e) {
        if (this.curTarget === undefined) return;
        this.curTarget.remove();
        this.copiedNode.style.opacity = "1.0";
        document.removeEventListener('mousemove', this.onMouseMoveHandler);
        this.copiedNode.addEventListener('mousedown', this.dragDownHandler.bind(this));
        this.copiedNode.addEventListener('mouseup', this.dropUpHandler.bind(this));
        this.updateEvent(this.copiedNode);
        this.cardsTitle = _dom.queryAll('.list-title');
    }

    async dragAndDrop() {
        const { } = await this.model.getInitialData();
        const note = _dom.queryAll('.list-view');
        note.forEach(element => {
            element.addEventListener('mousedown', this.dragDownHandler.bind(this));
            element.addEventListener('mouseup', this.dropUpHandler.bind(this));
        })
    }

    updateEvent(element) {
        element.addEventListener('dblclick', this.editListHandler.bind(this));
        const removeListBtn = _dom.queryAll('.list-remove');
        removeListBtn.forEach(element => {
            element.addEventListener('click', this.removeListHandler.bind(this));
        })
    }

    // remove note handler
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
    // remove note
    async removeListView() {
        const { } = await this.model.getInitialData();
        const removeListBtn = _dom.queryAll('.list-remove');
        removeListBtn.forEach(element => {
            element.addEventListener('click', this.removeListHandler.bind(this));
        })
    }

    // edit note title handler
    async editListHandler(e) {
        const cardId = e.currentTarget.getAttribute('data');
        const id = e.currentTarget.getAttribute('data-idx');
        const modalHeader = _dom.query('.modal-header-title');

        let mode = '';
        const modalInput = _dom.query('.modal-input');
        modalInput.value = '';
        this.modal.classList.remove('none');
        this.editModal.classList.remove('none');
        this.modalSaveBtn.classList.remove('none');
        this.modalWriteBtn.classList.add('none');

        if (id == -1) {
            mode = 'card';
            _dom.html(modalHeader, '카드 제목 수정하기');
        }
        else {
            mode = 'list';
            _dom.html(modalHeader, '노트 제목 수정하기');
        }
        await this.model.setModalState({ cardId, id, mode });

        this.modalSaveBtn.addEventListener('click', function () {
            const newTitle = modalInput.value;
            const input = { input: { title: newTitle } };
            this.model.editTodo({ ...this.model.state, input }, this.model.state.mode);
            this.modal.classList.add('none');
            this.editModal.classList.add('none');
        }.bind(this))
    }

    // edit note title
    async editListView() {
        const { } = await this.model.getInitialData();
        const card = _dom.queryAll('.card-header');
        const note = _dom.queryAll('.list-view');
        const closeBtn = _dom.query('.btn-edit-close-modal');
        note.forEach(element => {
            element.addEventListener('dblclick', this.editListHandler.bind(this));
        })
        card.forEach(element => {
            element.addEventListener('dblclick', this.editListHandler.bind(this));
        })
        closeBtn.addEventListener('click', () => {
            this.modal.classList.add('none');
            this.editModal.classList.add('none');
        })
    }

    // filter cards
    async findListsHandler(e) {
        const { } = await this.model.getInitialData();
        const value = e.target.value;
        const cardsTitleArr = this.cardsTitle.reduce((acc, item, idx) => {
            let obj = {};
            obj[idx] = {
                current: item,
                title: item.textContent
            }
            acc = [...acc, obj];
            return acc;
        }, []);
        cardsTitleArr.forEach((item, idx) => {
            if (!item[idx].title.match(value)) {
                item[idx].current.parentNode.classList.add('none');
            } else {
                item[idx].current.parentNode.classList.remove('none');
            }
        })
    }

    // 검색으로 리스트를 찾기
    findListView() {
        const searchBox = _dom.query('.search-input');
        searchBox.addEventListener('input', this.findListsHandler.bind(this));
    }

    init() {
        this.render();
        this.removeListView();
        this.editListView();
        this.dragAndDrop();
        this.findListView();
    }
}

export default ListView;