
import TodoService from "../services/Todo";

import { ref, onMounted } from 'vue';

const todoList = ref([]);
const todo = ref({});

export function getTodoList () {

  onMounted(async () => {
    const res = await TodoService.getTodoList();

    if (res.code === 0) {
      todoList.value = res.data;
    }
  });

  return todoList;
}

export function getTodo (id) {
  onMounted(async () => {
    const res = await TodoService.getTodo();

    if (res.code === 0) {
      todo.value = res.data;
    }
  });

  return todo;
}

export async function addTodo (todo) {
  const res = await TodoService.addTodo(todo);

  if (res.code === 0) {
    todoList.value = [...todoList.value, res.data];
  }
}

export async function removeTodo (id, cb) {
  const res = await TodoService.removeTodo(id);

  if (res.code === 0) {
    todoList.value = todoList.value.filter(item => item._id != id);
    cb && cb();
  }
}

export async function toggleTodo (id) {
  const res = await TodoService.toggleTodo(id);

  if (res.code === 0) {
    todoList.value = todoList.value.map(item => {
      if (item._id === id) {
        item.completed = !item.completed;
      }

      return item;
    });
  }
}

