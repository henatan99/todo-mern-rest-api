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

exports.getTodo = (req, res) => {
    // this is pretty simple because we've already defined a middleware
    // to get a todo from the URL id
    // this req.todo is coming from that middleware
    return res.json(req.todo)
}

exports.createTodo = (req, res) => {
    // we will get json data from the frontend i.e req.body
    const todo = new Todo(req.body);

    //create a todo instance by passing 'task' field from 'req.body'
    todo.save((err, task) => {
        if(err || !task) {
            return res.status(400).json({
                error: "something went wrong",
            });
        }

        // todo is created 
        // send the created todo as json repsonse 
        res.json({ task });
    });
};

exports.updateTodo = (req, res) => {
    // take req.todo from getTodoById() middleware and 
    // fetch the todo that user wants to update 
    const todo = req.todo;

    // simply change the task of the todo that user want to update by
    // the task that user has sent in req.body.task
    todo.task = req.body.task;

    // simply save that updated todo
    todo.save((err, t) => {
        if(err || !t) {
            return res.status(400).json({
                error: 'something went wrong while updating'
            });
        }
        // snd the updated todo as json response 
        res.json(t);
    });
};