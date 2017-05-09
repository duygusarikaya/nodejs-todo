var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.add = function(request, result) {
	var user = new User(request.body);
	user.save(function(error, user) {
		if(error)
			result.send(error); 
		result.json(user);
	});
};

exports.get_all = function(request, result) {
	User.find({}, function(error, user) {
		if(error)
			result.send(error); 
		result.json(user);
	});
};