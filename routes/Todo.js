const express = require('express');
const router = express.Router();

// these are the controllers
// we will create all of them in the futrure

const {
    createTodo,
    getTodoById,
    getTodo,
    deleteTodo,
    getAllTodos,
    updateTodo,
} = require('../controllers/Todo');

// params
// it will fetch the value fomr the url
router.param('todoId', getTodoById);

// to get all the todos
router.get('/todos', getAllTodos);

// to get a singletodo
router.get('/todo/:todoId/', getTodo);

// to create a todo
router.post('/todo/create/', createTodo);

// to update the todo
router.put('/todo/:todoId/update', updateTodo);

// to delete the todo
router.delete('/todo/:todoId/delet', deleteTodo);

module.exports = router