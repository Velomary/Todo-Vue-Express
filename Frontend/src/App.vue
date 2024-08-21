<template>
  <div id="app">
    <h1>Todo <span class="titleSpan">App</span> </h1>
    <todo-input @add-todo="addTodo" class="AddInput"></todo-input>
    <todo-list
    :todos="todos"
    @update-todo="updateTodo"
    @delete-todo="deleteTodo"
    @save-edit="saveEdit"
    />
    <button @click="deleteAllTodos">Supprimer tout</button>
  </div>
</template>

<script>
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoInput,
    TodoList,
  },
  data() {
    return {
      todos: [],
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        this.todos = response.data.map(todo => ({ ...todo, isEditing: false }));
      } catch (error) {
        console.error('Erreur lors de la récupération des todos:', error);
      }
    },
    async addTodo(title) {
      try {
        const response = await axios.post('http://localhost:3000/todos', { title });
        this.todos.push({ ...response.data, isEditing: false });
      } catch (error) {
        console.error('Erreur lors de l\'ajout du todo:', error);
      }
    },
    async updateTodo(todo) {
      try {
        await axios.put(`http://localhost:3000/todos/${todo.id}`, { completed: todo.completed });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du todo:', error);
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`http://localhost:3000/todos/${id}`);
        this.todos = this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error('Erreur lors de la suppression du todo:', error);
      }
    },
    async saveEdit(todo) {
      try {
        await axios.put(`http://localhost:3000/todos/${todo.id}`, { title: todo.title });
      } catch (error) {
        console.error('Erreur lors de l\'édition du todo:', error);
      }
    },
    async deleteAllTodos() {
      try {
        await axios.delete('http://localhost:3000/todos');
        this.todos = [];
      } catch (error) {
        console.error('Erreur lors de la suppression de tous les todos:', error);
      }
    },
  },
};
</script>
<style>
  :root{
    --first:white;
    --second:rgb(18, 146, 61);
    --third:black;
  }
  body{
    background-color: var(--third);
    color: var(--first);
    font-family: outfit;
  }
  h1{
    text-align: center;
    font-size: 60px;
    margin: 50px;
    font-weight: 650;
    color: var(--first);
    cursor: pointer;
  }
  .titleSpan{
    color: var(--second);
  }
  #app{
    text-align: center;
    align-items: center;
  }
  .AddInput{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  button{
    margin: 15px;
    padding: 10px 15px;
    background-color: var(--second);
    border: none;
    color: var(--first);
    text-decoration: none;
    font-size: large;
    border-radius: 10px;
    transition: all 1s;
    cursor: pointer;
  }
  button:hover{
    opacity: 0.8;
  }
  todo-list{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 2rem;
  }
</style>