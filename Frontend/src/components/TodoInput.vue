<template>
    <div>
      <input
        v-model="newTodo"
        @keyup.enter="submitTodo"
        placeholder="Add a todo"
        class="input"
      />
      <button @click="submitTodo">Ajouter</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTodo: '',
      };
    },
    methods: {
      submitTodo() {
        if (!this.newTodo) return;
        this.$emit('add-todo', this.newTodo);
        this.newTodo = ''; // Réinitialiser le champ de saisie
      },
    },
  };
  </script>
  <style>
    .input{
      padding: 18px;
    height: 15px;
    width: 300px;
    outline: none;
    border: 3px solid var(--second);
    border-radius: 25px;
    font-size: large;
    background-color: transparent; 
    color: var(--first);
    }
  </style>
  