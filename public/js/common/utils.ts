const $ = (target, parent = document) => {
  return parent.querySelector(target);
};

const createNewElement = (tag, className, innerText) => {
  const newElement = document.createElement(tag);
  newElement.className = className;
  newElement.innerText = innerText;
  return newElement;
};

const deleteClassFromElement = (element, className) => {
  element.classList.remove(className);
};

const deleteElement = (element) => {
  element.parentNode.removeChild(element);
};

const _addBubbledEventListener = (eventType, eventDelegatedElement, selector, callback) => {
  eventDelegatedElement.addEventListener(eventType, (event) => {
    if (event.target === selector) callback(event);
  });
};

const getIndexFromParent = (element) => {
  let elementIndex = 0;

  while (element !== null && element.previousSibling !== null) {
    element = element.previousSibling;
    elementIndex += 1;
  }

  return elementIndex;
};

export { $, createNewElement, deleteClassFromElement, getIndexFromParent, deleteElement };
