class InputView {
    constructor({onChange, defaultValue = '', placeholder = '', showLabel = false, label = ''}) {

    }

    render() {
        showInputLabel? `<label>${labelName}</label><input type="text" placeholder="이름을 입력하세요." value="${defaultValue?defaultValue:''}"></input>`:``
    }
}


const defaultConfig = {
    id:"modal",
    title:"",
    buttonText: ["Save"],
    showInputLabel: false,
    defaultValue: '',
    labelName: '',
    onClickButton: [()=>{console.log('button clicked')}],
}

class ModalView {
    constructor (config = defaultConfig) {
        this.config = config;
        this.removeModal = this.removeModal.bind(this);
        this.onClickCloseButton = this.onClickCloseButton.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
        this.render = this.render.bind(this);
        this.init();
    }
    
    init() {
        this.render(this.config);
    }

    /**
     * DOM에서 모달 삭제
     */
    removeModal() {
        const modalEle = document.querySelector('.modal-container');
        modalEle.remove()
    }

    onClickCloseButton() {
        this.removeModal();
    }

    onClickButton(e) {
        const inputEle = document.querySelector('.modal input');
        if (inputEle) {
            this.config.onClickButton[0](inputEle.value);
        } else {
            this.config.onClickButton[0]();
        }
        this.removeModal();
    }

    renderModalBackground() {
        const modalBackgroundEle = document.createElement('div');
        modalBackgroundEle.className = "modal-background";
        return modalBackgroundEle;
    }

    render({id, title, buttonText, showInputLabel, labelName, onClickButton, defaultValue}) {
        const modalEle = document.createElement('div');
        modalEle.className = 'modal-container'
        modalEle.id = id;
        modalEle.appendChild(this.renderModalBackground());
        const innerHtml = `<div class="modal-background"></div>
            <div class="modal">
                <div class="modal-header">
                    <div class="modal-title">
                        ${title}
                    </div>
                    <div class="close-button">
                        ✕
                    </div>
                </div>
                <div class="modal-content">
                ${showInputLabel? `<label>${labelName}</label><input type="text" placeholder="이름을 입력하세요." value="${defaultValue?defaultValue:''}"></input>`:``}
                </div>
                <div class="modal-buttons">
                    <button class="modal-button">
                        ${buttonText[0]}
                    </button>
                </div>
            </div>`
        modalEle.innerHTML = innerHtml;
        document.querySelector('body').appendChild(modalEle);
        modalEle.querySelector('.close-button').addEventListener('click', this.onClickCloseButton);
        modalEle.querySelector('.modal-buttons').firstElementChild.addEventListener('click', this.onClickButton);
    }
}

export default ModalView;