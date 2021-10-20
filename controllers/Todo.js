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

