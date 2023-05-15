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
