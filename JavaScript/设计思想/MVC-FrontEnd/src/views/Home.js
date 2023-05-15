import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";


export default function Home (todoList) {
  return (
    `
    <div>
      ${ TodoForm() }
      <ul class="list">
        ${
          todoList.list.map(item => (
            TodoItem(item)
          )).join('')
        }
      </ul>
    </div> 
    `
  )
}
