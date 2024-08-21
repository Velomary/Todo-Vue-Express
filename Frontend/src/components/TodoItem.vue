<template>
  <div class="contener">
    <ul class="content">
      <li>
        <input type="checkbox" v-model="todo.completed" @change="updateTodo" id="check"/>
        <span v-if="!todo.isEditing" :class="{ done: todo.completed }">{{ todo.title }}</span>
        <input v-else v-model="todo.title" @keyup.enter="saveEdit" class="EditInput" />
        <button @click="toggleEdit">{{ todo.isEditing ? 'Save' : 'Edit' }}</button>
        <button @click="deleteTodo" class="DeleteButton">Delete</button>
      </li>
    </ul>
  </div>
  </template>
  
  <script>
  export default {
    props: {
      todo: Object,
    },
    methods: {
      updateTodo() {
        this.$emit('update-todo', this.todo);
      },
      deleteTodo() {
        this.$emit('delete-todo', this.todo.id);
      },
      toggleEdit() {
        if (this.todo.isEditing) {
          this.saveEdit();
        } else {
          this.todo.isEditing = true;
        }
      },
      saveEdit() {
        this.$emit('save-edit', this.todo);
        this.todo.isEditing = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .done {
    text-decoration: line-through;
  }
  li{
    list-style-type: none;
    font-size: 24px;
  }
  .contener{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .content{
    flex: 1;
    display: flex;
    align-items: center;
  }

  span{
    width: 350px;
    display: inline-block;
    text-align: left;
  }
  .EditInput{
    background: none;
    outline: none;
    border: none;
    width: 350px;
    padding-left: 4px;
    padding-bottom: 3px;
    font-size: 24px;
    border-bottom: none;
    transition: all 0.09s;
    color: var(--first);
    border-bottom: 2px solid var(--second);
  }
  .DeleteButton{
    margin: 5px;
    padding: 7px 12px;
    text-decoration: none;
    font-size: large;
    border: 4px solid var(--second);
    background-color: var(--third);
    border-radius: 10px;
    cursor: pointer;
    color: var(--first);
  }
  /* custom Checkbox */
  input[type=checkbox]{
    margin: 0 30px;
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: #5f5f5f;
    appearance: none;
    cursor: pointer;
  }
  input[type=checkbox]:checked{
    background-color: var(--second);
  }
  input[type=checkbox]::before{
    content: '';
    position: absolute;
    top: 2px;
    left: 7px;
    width: 4px;
    height: 11px;
    border: 3px solid transparent;
    border-left: none;
    border-top: none;
    transform: rotate(45deg) scale(1);
  }
  input[type=checkbox]:checked::before{
    border-color: white;
    animation: checkAnim .2s ease;
  }
  @keyframes checkAnim{
    from{
      transform: rotate(45deg) scale(0);
    }
  }
  
  </style>
  