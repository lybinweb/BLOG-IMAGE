export default function TodoItem (todo) {
  return (
    `
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

    `
  )
}
