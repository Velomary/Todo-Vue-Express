const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Connexion à la base de données
const Todo = require('./models/Todo'); // Modèle Todo

const app = express();
app.use(cors());
app.use(express.json());

// Route pour obtenir toutes les tâches
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll(); // Récupérer toutes les tâches
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
  }
});

// Route pour ajouter une nouvelle tâche
app.post('/todos', async (req, res) => {
  try {
    const todo = await Todo.create({ title: req.body.title }); // Créer une nouvelle tâche
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la tâche' });
  }
});

// Route pour mettre à jour une tâche existante
app.put('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findByPk(req.params.id);
      if (todo) {
        todo.title = req.body.title !== undefined ? req.body.title : todo.title;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        await todo.save();
        res.json(todo);
        console.log('Body reçu par le serveur:', req.body);
      } else {
        res.status(404).json({ error: 'Tâche non trouvée' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
    }
  });

app.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      todo.title = req.body.title !== undefined ? req.body.title : todo.title;
      todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
      await todo.save();
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Tâche non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
  }
});
  
// Route pour supprimer une tâche
app.delete('/todos/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    const result = await Todo.destroy({ where: { id: todoId } }); // Supprimer la tâche par son ID
    if (result) {
      res.json({ success: true, message: 'Todo supprimé avec succès' });
    } else {
      res.status(404).json({ success: false, message: 'Todo non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la suppression du todo', error });
  }
});

// Route pour supprimer tous les todos
app.delete('/todos', async (req, res) => {
    try {
      await Todo.destroy({ where: {}, truncate: true }); // Supprime tous les todos
      res.status(200).json({ message: 'Tous les todos ont été supprimés' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression des todos' });
    }
  });
  

// Lancer le serveur
app.listen(3000, async () => {
  console.log('Server running on port 3000');

  // Synchronisation avec la base de données MySQL
  try {
    await sequelize.sync();
    console.log('Base de données synchronisée');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  }
});


