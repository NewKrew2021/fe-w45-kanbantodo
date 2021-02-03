
interface ModalConfig {
    id: string;
    title: string;
    buttonText: string[];
    showInputLabel?: boolean;
    defaultValue?: string;
    labelName?: string;
    onClickButton: Function[];
}

interface ModalView {
    config: ModalConfig;
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
    constructor (config: ModalConfig) {
        this.config = {...defaultConfig, ...config};
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
        modalEle && modalEle.remove()
    }

    onClickCloseButton() {
        this.removeModal();
    }

    onClickButton() {
        const inputEle = document.querySelector('.modal input') as HTMLInputElement;
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

    render({id, title, buttonText, showInputLabel, labelName, onClickButton, defaultValue}: ModalConfig) {
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
        document.querySelector('body')!.appendChild(modalEle);
        const closeButton = modalEle.querySelector('.close-button');
        const modalButtonContainer =  modalEle.querySelector('.modal-buttons');
        closeButton && closeButton.addEventListener('click', this.onClickCloseButton);
        modalButtonContainer && modalButtonContainer.firstElementChild && modalButtonContainer.firstElementChild.addEventListener('click', this.onClickButton);
    }
}

export default ModalView;