var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var User = mongoose.model('User');

//'/api/users/:id/todos'
exports.add = function(request, result) {
	checkAuthorization(request, request.params.id, function(isAuthorized) {
		if(isAuthorized) {
			var todo = new Todo(request.body);
			todo.userId = request.params.id;
			todo.save(function(error, todo) {
				if(error)
					result.send(error); 
				result.json(todo);
			});
		} else {
			result.status(401).send({cause: 'Unauthorized user'});
		}
	});
};


exports.get = function(request, result) {
	findUserIdByTodoId(request.params.id, function(userId) {
		//console.log('userId: '+userId);
		checkAuthorization(request, userId, function(isAuthorized) {
			if(isAuthorized) {
				Todo.findById(request.params.id, function(error, todo) {
					if(error)
						result.send(error);
					result.json(todo);
				});
			} else {
				result.status(401).send({cause: 'Unauthorized user'});
			}
		});
	});


	
};

exports.update = function(request, result) {
	findUserIdByTodoId(request.params.id, function(userId) {
		//console.log('userId: '+userId);
		checkAuthorization(request, userId, function(isAuthorized) {
			if(isAuthorized) {
				request.body.userId = userId;
				Todo.findOneAndUpdate(request.params.id, request.body, {new: true}, function(error, todo) {
					if(error)
						result.send(error);
					result.json(todo);
				});
			} else {
				result.status(401).send({cause: 'Unauthorized user'});
			}
		});
	});
};

exports.delete = function(request, result) {
	findUserIdByTodoId(request.params.id, function(userId) {
		//console.log('userId: '+userId);
		checkAuthorization(request, userId, function(isAuthorized) {
			if(isAuthorized) {
				Todo.remove({_id: request.params.id }, function(error, todo) {
					if(error)
						result.send(error);
					result.json({message: 'Deleted', status: 'OK'});
				});
			} else {
				result.status(401).send({cause: 'Unauthorized user'});
			}
		});
	});
};

//'/api/users/:id/todos'
exports.get_all = function(request, result) {
	checkAuthorization(request, request.params.id, function(isAuthorized) {
		if(isAuthorized) {
			Todo.find({userId: request.params.id}, function(error, todo) {
				if(error)
					result.send(error);
				result.json(todo);
			});
		} else {
			result.status(401).send({cause: 'Unauthorized user'});
		}
	});
};

//TODO: only for dev
exports.get_god_mode = function(request, result) {
	Todo.find({}, function(error, todo) {
		if(error)
			result.send(error); 
		result.json(todo);
	});
};

function checkAuthorization(request, userId, fn){
	User.findOne({_id: String(userId)}, function(error, user){
		if(error)
			fn(Boolean(false)); 
		var auth = 'Basic ' + new Buffer(user.email + ':' + user.pass).toString('base64');
		var apikey = request.headers.authorization;
		fn(Boolean(apikey == auth));
	});
}

function findUserIdByTodoId(tid, fn) {
	Todo.findById(tid, function(error, todo) {
		if(error)
			fn(error);
		fn(todo.userId);
	});
}