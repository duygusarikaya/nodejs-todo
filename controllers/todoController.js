var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

exports.add = function(request, result) {
	var todo = new Todo(request.body);
	todo.save(function(error, todo) {
		if(error)
			result.send(error); 
		result.json(todo);
	});
};

exports.get = function(request, result) {
	Todo.findById(request.params.id, function(error, todo) {
		if(error)
			result.send(error);
		result.json(todo);
	});
};

exports.update = function(request, result) {
	Todo.findOneAndUpdate(request.params.id, request.body, {new: true}, function(error, todo) {
		if(error)
			result.send(error);
		result.json(todo);
	});
};

exports.delete = function(request, result) {
	Todo.remove({
		_id: request.params.id }, function(error, todo) {
			if(error)
				result.send(error);
			result.json({message: 'Deleted', status: 'OK'});
	});
};

//'/api/users/:id/todos'
exports.get_all = function(request, result) {
	Todo.find({userId: request.params.id}, function(error, todo) {
		if(error)
			result.send(error);
		result.json(todo);
	});
};
