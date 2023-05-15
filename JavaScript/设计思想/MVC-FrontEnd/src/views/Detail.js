import TodoInfo from "../components/TodoInfo";

export default function Detail (todo) {
  return (
    `
      <div>
        ${ TodoInfo(todo) }
      </div>
    `
  )
}
