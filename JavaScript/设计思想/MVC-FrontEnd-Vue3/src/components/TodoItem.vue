<template>
  <li>
    <input
      type="checkbox"
      :checked="todo.completed"
      @click="toggleTodo(todo._id)"
    />
    <router-link
      :to="{ name: 'detail', params: { id: todo._id } }"
      :class="{ 'completed': todo.completed }"
    >
      {{ todo.title }}
    </router-link>
    <button @click="removeTodo(todo._id)">REMOVE</button>
  </li>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    todo: Object
  });

  const emit = defineEmits([
    'toggleTodo',
    'removeTodo'
  ]);

  const toggleTodo = (id) => {
    emit('toggleTodo', id);
  }

  const removeTodo = (id) => {
    emit('removeTodo', id);
  }

</script>

<style scoped>
  .completed {
    text-decoration: line-through;
  }
</style>
