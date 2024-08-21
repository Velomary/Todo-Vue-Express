<template>
    <ul>
      <todo-item
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
        @save-edit="saveEdit"
      />
    </ul>
  </template>
  
  <script>
  import TodoItem from './TodoItem.vue';
  
  export default {
    components: {
      TodoItem,
    },
    props: {
      todos: Array,
    },
    methods: {
      updateTodo(todo) {
        this.$emit('update-todo', todo);
      },
      deleteTodo(id) {
        this.$emit('delete-todo', id);
      },
      saveEdit(todo) {
        this.$emit('save-edit', todo);
      },
    },
  };
  </script>
  