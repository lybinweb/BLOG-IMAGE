
## MVP

> MVP：在视图呈现上分层

- M：model 数据创建、数据操作方法集合（提供回调，在P中更新视图）
- V：view 视图管理、视图函数（处理更新）
- P：presenter 呈现管理

- 从前端视图与数据关系的逻辑分层给予了明确指导
- 做到了视图呈现的逻辑与数据管理和视图之间的分离
- 但并没有对呈现逻辑做彻底的抽象，我们每写一个MVP的时候，都需要创建独立的呈现管理器

## MVP设计思想实现TodoList

### index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="./presenter.js"></script>
</body>
</html>

```

### views

#### views/Form.js

```js
export default function TodoForm () {
  const oTodoForm = document.createElement('div');

  oTodoForm.innerHTML += TodoInput();
  oTodoForm.innerHTML += AddButton();
}

function TodoInput () {
  return (
    `
      <input 
        type="text"
        id="J_TodoInput"
      />
    `
  )
}

function AddButton () {
  return (
    `
      <button id="J_btn">ADD</button>
    `
  )
}


```

#### views/TodoList.js

```js
export function TodoList (todoData) {
  const oList = document.createElement('ul');
  oList.id = 'J_TodoList';

  todoData.forEach(todo => {
    oList.appendChild(TodoItem(todo));
  });

  return oList;
}

export function TodoItem (todo) {
  const oLi = document.createElement('li');

  oLi.innerHTML = `
    <input
      type="checkbox"
      ${ todo.completed ? 'checked' : '' }
      data-id="${ todo.id }"
    />
    <span
      style="text-decoration: ${ todo.completed ? 'line-through' : '' }"
    >${ todo.content }</span>
    <button data-id="${ todo.id }">DELETE</button>
  `;

  return oLi;
}


```

#### views/index.js

```js
import TodoForm from './Form';
import {
  TodoList,
  TodoItem
} from "./TodoList";

export {
  TodoList,
  TodoForm,
  TodoItem
}


```

### model.js

```js
export default class TodoModel {
  constructor () {
    this.todoText = '';
    this.todoData = [];
  }

  setTodoText (text) {
    this.todoText = text;
  }

  addTodo (text, callback) {
    const todo = {
      id: new Date().getTime(),
      content: text,
      completed: false
    }

    this.todoData.push(todo);
    doCallback(callback, todo);
    this.setTodoText('');
  }

  toggleTodo (id, callback) {
    this.todoData = this.todoData.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    doCallback(callback, id);
  }

  removeTodo (id, callback) {
    this.todoData = this.todoData.filter(todo => todo.id !== id);
    doCallback(callback, id);
  }

  static create () {
    if (!TodoModel.instance) {
      TodoModel.instance = new TodoModel();
    }

    return TodoModel.instance;
  }
}

function doCallback (callback, arg) {
  typeof callback === 'function' && callback(arg);
}


```

### presenter.js

```js
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


```
