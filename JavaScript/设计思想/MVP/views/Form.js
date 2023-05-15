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
