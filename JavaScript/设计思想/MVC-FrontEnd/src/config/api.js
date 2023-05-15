const BASE_URL = 'http:localhost:8081/';

export const TODO_API = {
  GET_TODOLIST: `${ BASE_URL }get_todoList`,
  GET_TODO: `${ BASE_URL }get_todo`,
  ADD_TODO: `${ BASE_URL }add_todo`,
  TOGGLE_TODO: `${ BASE_URL }toggle_todo`,
  REMOVE_TODO: `${ BASE_URL }remove_todo`,
}
