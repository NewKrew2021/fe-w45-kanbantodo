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
        this.onClickCloseButton = this.onClickCloseButton.bind(this);
        this.removeModal = this.removeModal.bind(this);
        this.config = config;
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

    onClickButton(value) {
        this.config.onClickButton[0](value);
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
        modalEle.querySelector('.close-button').addEventListener('click', this.onClickCloseButton)
        modalEle.querySelector('.modal-buttons').firstElementChild.addEventListener('click', () => {
            const inputEle = modalEle.querySelector('input');
            if (inputEle) {
                const { value } = inputEle;
                onClickButton[0](value);
                inputEle.value = '';
            } else {
                onClickButton[0]();
            }
            this.onClickCloseButton();
        })
        document.querySelector('body').appendChild(modalEle);
    }
}

export default ModalView;