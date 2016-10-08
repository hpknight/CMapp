var Todo = require('../models/todo');

module.exports = function(app, express) {
	var todoRouter = express.Router();

	todoRouter.route('/todo')
		.post(function(req, res) {
			var todo = new Todo(req.body);

			todo.save(function(err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Todo created!' });
			});
		})
		.get(function(req, res) {
			Todo.find(function(err, todos) {
				if (err) {
					res.send(err);
				}
				res.json(todos);
			});
		});

	todoRouter.route('/todo/:todo_id')
		.get(function(req, res) {
			Todo.findById(req.params.todo_id, function(err, todo) {
				if (err) {
					res.send(err);
				}
				res.json(todo);
			});
		})
		.put(function(req, res) {
			Todo.findById(req.params.todo_id, function(err, todo) {
				if (err) {
					res.send(err);
				}

				if (req.body.titke) {
					todo.title = req.body.title;
				}
				if (req.body.description) {
					todo.description = req.body.description;
				}
				if (req.body.userId) {
					todo.userId = req.body.userId;
				}

				todo.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json({ message: 'Todo updated!' });
				});
			});
		})
		.delete(function(req, res) {
			Todo.remove({
				_id: req.params.todo_id
			}, function(err, user) {
				if (err) {
					return res.send(err);
				}
				res.json({ message: 'Successfully deleted todo' });
			});
		});

	return todoRouter;
};

