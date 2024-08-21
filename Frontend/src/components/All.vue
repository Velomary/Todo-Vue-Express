<template>
    <div id="app">
      <h1>Todo App</h1>
      <div>
        <input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Add a todo"
        />
        <!-- Bouton pour ajouter un todo -->
        <button @click="addTodo">Ajouter</button>
         
      </div>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" />
          <span v-if="!todo.isEditing" :class="{ done: todo.completed }">{{ todo.title }}</span>
          <input v-else v-model="todo.title" @keyup.enter="saveEdit(todo)" />
          <button @click="deleteTodo(todo.id)">Delete</button>
          <button @click="toggleEdit(todo)">
            {{ todo.isEditing ? 'Save' : 'Edit' }}
          </button>
        </li>
      </ul>
    </div>
    <div>
      <!-- Bouton pour supprimer tous les todos -->
      <button @click="deleteAllTodos">Supprimer tout</button>
      <HelloWorld></HelloWorld>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newTodo: '',
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
      async addTodo() {
        if (!this.newTodo) return;
        try {
          const response = await axios.post('http://localhost:3000/todos', { title: this.newTodo });
          this.todos.push({ ...response.data, isEditing: false });
          this.newTodo = '';
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
      toggleEdit(todo) {
        if (todo.isEditing) {
          this.saveEdit(todo); // Si en mode édition, sauvegarder les changements
        } else {
          todo.isEditing = true; // Sinon, passer en mode édition
        }
      },
      async saveEdit(todo) {
        try {
        await axios.put(`http://localhost:3000/todos/${todo.id}`, {
          title: todo.title,      // S'assure que le titre est bien envoyé
          completed: todo.completed,
          
        });
          console.log('Données envoyées:', { title: todo.title, completed: todo.completed });
          todo.isEditing = false;
        } catch (error) {
          console.error('Erreur lors de l\'édition du todo:', error);
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
      async deleteAllTodos() {
        try {
          await axios.delete('http://localhost:3000/todos');
          this.todos = []; // Réinitialiser la liste des todos
        } catch (error) {
          console.error('Erreur lors de la suppression de tous les todos:', error);
        }
      },    
    },
  };
  </script>
  
  <style>
  .done {
    text-decoration: line-through;
  }
  </style>
  