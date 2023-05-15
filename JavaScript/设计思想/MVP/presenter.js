import {
  TodoItem,
  TodoList,
  TodoForm
} from "./views";

import TodoModel from "./model";

;(() => {
  const oApp = document.querySelector('#app');
  const todoModel = TodoModel.create();

  const nodes = {
    oTodoInput: null,
    oAddBtn: null,
    oList: null
  }

  const init = () => {
    render();
    bindEvent();
  }

  function render () {
    const oFragment = document.createDocumentFragment();

    oFragment.appendChild(TodoForm());
    oFragment.appendChild(TodoList(todoModel.todoData));
    oApp.appendChild(oFragment);
  }

  function bindEvent () {
    nodes.oTodoInput = document.querySelector('#J_TodoInput');
    nodes.oAddBtn = document.querySelector('#J_AddBtn');
    nodes.oList = document.querySelector('#J_TodoList');

    nodes.oTodoInput.addEventListener('input', handleTodoInput, false);
    nodes.oAddBtn.addEventListener('click', handleAddBtnClick, false);
    nodes.oList.addEventListener('click', handleListClick, false);
  }

  function handleTodoInput (e) {
    todoModel.setTodoText(e.target.value);
  }

  function handleAddBtnClick () {
    const text = todoModel.todoText;
    if (!text.length) return;

    todoModel.addTodo(text, (todo) => {
      appendItem(TodoItem(todo));
    });
  }

  function handleListClick (e) {
    const tar = e.target;
    const tagName = tar.tagName.toLowerCase();

    switch (tagName) {
      case 'input':
        handleCheckboxClick(tar);
        break;
      case 'button':
        handleDeleteClick(tar);
        break;
      default:
        break;
    }
  }

  function handleCheckboxClick (target) {
    const id = target.dataset.id;

    todoModel.toggleTodo(id, (id) => {
      toggleItem(target);
    });
  }

  function handleDeleteClick (target) {
    const id = target.dataset.id;

    todoModel.removeTodo(id, (id) => {
      removeItem(target);
    });
  }

  function appendItem (item) {
    nodes.oList.appendChild(item);
    nodes.oTodoInput.value = '';
  }

  function toggleItem (target) {
    target.parentNode.querySelector('span').style.textDecoration =
      target.checked ? 'line-through' : '';
  }

  function removeItem (target) {
    target.parentNode.remove();
  }

  init();
})();
