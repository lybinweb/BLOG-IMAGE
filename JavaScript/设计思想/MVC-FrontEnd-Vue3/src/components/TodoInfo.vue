<template>
  <div>
    <div>
      <h1>{{ todo.title }}</h1>
      <p>Create at {{ todo.createAt }} </p>
      <p>completed: {{ todo.completed ? 'Yes' : 'No' }}</p>
      <p>Content: {{ todo.content }}</p>
      <p>
        <router-link to="/">Back</router-link>
        <button @click="removeTodo(todo._id)">REMOVE</button>
      </p>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    todo: Object
  });

  const emit = defineEmits(['removeTodo']);

  const removeTodo = (id) => {
    emit('removeTodo', id);
  }
</script>

<style scoped>

</style>
