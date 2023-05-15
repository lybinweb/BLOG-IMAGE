export default function TodoForm () {
  return (
    `
    <div>
      <p>
          <input
              type="text"
              placeholder="Todo title"
              class="todo-title"
          />
      </p>
      <p>
          <textarea
              placeholder="Todo Content"
              class="todo-content"
          ></textarea>
      </p>
      <p>
          <button class="add-btn">ADD</button>
      </p>
    </div>
 
    `
  )
}
