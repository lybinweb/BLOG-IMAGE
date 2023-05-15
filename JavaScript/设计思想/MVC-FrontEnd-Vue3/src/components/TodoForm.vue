<template>
  <div>
    <p>
      <input
        type="text"
        placeholder="Todo title"
        v-model="state.todoTitle"
      />
    </p>
    <p>
      <textarea
        placeholder="Todo Content"
        v-model="state.todoContent"
      ></textarea>
    </p>
    <p>
      <button @click="addTodo">ADD</button>
    </p>
  </div>
</template>

<script setup>
  import { reactive, defineEmits } from 'vue';

  const state = reactive({
    todoTitle: '',
    todoContent: ''
  });

  const emit = defineEmits(['addTodo']);

  const addTodo = () => {
    if (!state.todoTitle.length || !state.todoContent.length) return;

    emit('addTodo', {
      title: state.todoTitle,
      content: state.todoContent
    });

    state.todoTitle = '';
    state.todoContent = '';
  }

</script>

<style scoped>

</style>
