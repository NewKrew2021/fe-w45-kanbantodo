import moment from "moment";

const $ = (target: string, parent = document): HTMLElement | null => {
  return parent.querySelector(target);
};
const getTime = (): string => {
  return moment().format();
};

const translateTime = (time: string): string => {
  return moment(time).fromNow();
};

const createNewElement = (tag: string, className: string, innerText: string) => {
  const newElement = document.createElement(tag);
  newElement.className = className;
  newElement.innerText = innerText;
  return newElement;
};

const deleteClassFromElement = (element: HTMLElement, className: string) => {
  element.classList.remove(className);
};

const deleteElement = (element: any) => {
  element.parentNode.removeChild(element);
};

const _addBubbledEventListener = (
  eventType: string,
  eventDelegatedElement: any,
  selector: string,
  callback: any
) => {
  eventDelegatedElement.addEventListener(eventType, (event: any) => {
    if (event.target === selector) callback(event);
  });
};

const getIndexFromParent = (element: ChildNode) => {
  let elementIndex = 0;

  while (element !== null && element.previousSibling !== null) {
    element = element.previousSibling;
    elementIndex += 1;
  }

  return elementIndex;
};

export {
  $,
  createNewElement,
  deleteClassFromElement,
  getIndexFromParent,
  deleteElement,
  translateTime,
  getTime,
};
