export default function TodoInfo (todo) {
  return (
    `
      <div>
      <div id="app">
        <h1>${ todo.title }</h1>
        <p>Create at ${ todo.createAt } </p>
        <p>completed: ${ todo.completed ? 'Yes' : 'No' }</p>
        <p>Content: ${ todo.content }</p>
        <p>
            <a href="/#/">Back</a>
            <button
                data-id="${ todo._id }"
                id="removeBtn"
            >REMOVE</button>
        </p>
      </div>
    </div>
    `
  )
}
