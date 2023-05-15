import Home from "../views/Home";
import Detail from "../views/Detail";

import TodoService from "../services/Todo";
import TodoItem from "../components/TodoItem";

export async function HomeView () {
  const res = TodoService.getTodoList();

  if (res.code === 0) {
    return Home(res.data);
  }

}

export async function DetailView (params) {
  const  { id } = params;
  const res = await TodoService.getTodo(id);

  if (res.code === 0) {
    return Detail(res.data);
  }

}

export function homeScript () {
  const oApp = document.querySelector('#app');
  const oList = document.querySelector('#list');
  const oAddBtn = oApp.querySelector('.add-btn');
  const oTodoTitle = oApp.querySelector('.todo-title');
  const oTodoContent = oApp.querySelector('.todo-content');

  function bindEvent () {
    oList.addEventListener('click', handleListClick, false);
    oAddBtn.addEventListener('click', handleAddBtnClick, false);
  }

  function handleListClick (e) {
    const tar = e.target;
    const className = tar.className;

    switch (className) {
      case 'toggle-check-tar':
        handleCheckBoxClick(tar);
        break;
      case 'remove-btn':
        handleRemoveBtnClick(tar);
        break;
      default:
        break;
    }
  }

  async function handleCheckBoxClick (target) {
    const id = target.dataset.id;
    const res = await TodoService.toggleTodo(id);

    if (res.code === 0) {
      const oTitle = target.parentNode.querySelector('a');
      oTitle.classList.toggle('completed');
    }
  }

  async function handleRemoveBtnClick (target) {
    const id = target.dataset.id;
    const res = await TodoService.removeTodo(id);

    if (res.code === 0) {
      target.parentNode.remove();
    }
  }

  async function handleAddBtnClick () {
    const title = oTodoTitle.value;
    const content = oTodoContent.value;

    if (!title.length || !content.length) {
      return;
    }

    const res = await TodoService.addTodo({
      title,
      content
    });

    if (res.code === 0) {
      const listItem = TodoItem(res.data);
      oList.innerHTML += listItem;
      oTodoContent.value = '';
      oTodoTitle.value = '';
    }
  }

  bindEvent();
}

export function detailScript () {
  const oRemoveBtn = document.querySelector('#removeBtn');

  function bindEvent () {
    oRemoveBtn.addEventListener('click', handleRemoveBtnClick, false);
  }

  async function handleRemoveBtnClick (e) {
    const id = e.target.dataset.id;
    const res = await TodoService.removeTodo(id);

    if (res.code === 0) {
      location.href = '/#/';
    }
  }

  bindEvent();
}
