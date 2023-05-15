<template>
  <div>
      <TodoForm
        @add-todo="addTodo"
      ></TodoForm>
      <div>
          <ul>
              <TodoItem
                v-for="item of todoList"
                :todo="item"
                :key="item._id"
                @remove-todo="removeTodo"
                @toggle-todo="toggleTodo"
              ></TodoItem>
          </ul>
      </div>
  </div>
</template>

<script setup>
  import TodoForm from '../components/TodoForm.vue';
  import TodoItem from "../components/TodoItem.vue";

  import { getTodoList, addTodo, removeTodo, toggleTodo } from "../controllers/Todo";

  const todoList = getTodoList();
</script>
