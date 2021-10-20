const Todo = require('../models/Todo');

exports.getTodoById = (req, res, next, todoId) => {
    // todoId is coming form thr router.param
    //.findById() method will find the todo which has id==todoId 
    Todo.findById(todoId).exec((err, todo) => {
        if(err || !todo) {
            return res.status(400).json({
                error: "404 todo not found",
            });
        }

        // store that todo in req.todo so that other functions can use it
        req.todo = todo;
        // Because this is a middleware we have to call the next()
        // which will pass the control to the next function 
        // in the middleware
        next();
    });
};

exports.getAllTodos = (req, res) => {
    // simply use .find() method and it will return all teh todos
    Todo.find()
    .sort('-createdAt')
    .exec((err, todos) => {
        //error checking
        if (err || !todos) {
            return res.status(400).json({
                error: 'Something went wrong in finding all todos',
            });
        }
        // return all the todos in json format
        res.json(todos);
    })
};