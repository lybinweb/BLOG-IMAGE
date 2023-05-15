import {
  httpPost
} from "./http.js";

;(() => {
  const oApp = document.querySelector('#app');
  const oList = document.querySelector('#list');
  const oAddBtn = oApp.querySelector('.add-btn');
  const oTodoTitle = oApp.querySelector('.todo-title');
  const oTodoContent = oApp.querySelector('.todo-content');

  const init = () => {
    bindEvent();
  }

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

  function handleCheckBoxClick (target) {
    const id = target.dataset.id;

    toggleTodo(id).then(res => {
      if (res.code === 0) {
        const oTitle = target.parentNode.querySelector('a');
        oTitle.classList.toggle('completed');
      }
    });
  }

  function handleRemoveBtnClick (target) {
    const id = target.dataset.id;

    removeTodo(id).then(res => {
      if (res.code === 0) {
        target.parentNode.remove();
      }
    });
  }

  function handleAddBtnClick () {
    const title = oTodoTitle.value;
    const content = oTodoContent.value;

    if (!title.length || !content.length) {
      return;
    }

    addTodo({
      title,
      content
    }).then(res => {
      if (res.code === 0) {
        const data = res.data;
        const listItem = createItem(data);
        oList.appendChild(listItem);
      }
    });
  }

  async function addTodo (todo) {
    return await httpPost(
      'http://localhost:8080/add_todo',
      todo
    );
  }

  async function toggleTodo (id) {
    return await httpPost(
      'http://localhost:8080/toggle_tod',
      { id }
    )
  }

  async function removeTodo (id) {
    return await httpPost(
      'http://localhost:8080/remove_todo',
      { id }
    )
  }

  function createItem (todo) {
    const oLi = document.createElement('div');

    oLi.innerHTML = `
      <li>
        <input
            type="checkbox"
            ${ todo.completed ? 'checked' : "" }
            data-id="${ todo._id }"
            class="toggle-check-box"
        />
        <a
            href="http://localhost:8080/detail/${ todo._id }"
            class="${ todo.completed ? 'completed' : '' }"
        >
            ${ todo.title }
        </a>
        <button
            data-id="${ todo._id }"
            class="remove-btn"
        >REMOVE</button>
    </li>

    `;
  }

  init();
})();
