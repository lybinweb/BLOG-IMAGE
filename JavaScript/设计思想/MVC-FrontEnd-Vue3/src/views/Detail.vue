<template>
  <div>
    <TodoInfo
      :todo="todo"
      @remove-todo="deleteTodo"
    ></TodoInfo>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import TodoInfo from "../components/TodoInfo.vue";
  import {
    getTodo,
    removeTodo
  } from "../controllers/Todo";

  const router = useRouter();
  const id = router.currentRoute.value.params.id;
  const todo = getTodo(id);

  const deleteTodo = (id) => {
    removeTodo(id, () => {
      router.push('/');
    });
  }

</script>
