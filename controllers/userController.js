var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.login = function(request, result) {
	
	User.findOne({email: String(request.body.email)}, function(error, user){
    if(error) {
    	console.log('error');
      	return result.status(401).send(error);
  	}
    if(!user) {
      console.log('user not found');
      return result.status(401).send(error);
    }
    if(String(request.body.pass) != user.pass) {
      console.log('wrong pass');
      return result.status(401).send(error);
    }
    request.session.authenticated = true;
    return result.json(user);
  });
};

//a.k.a. register
exports.add = function(request, result) {
	var user = new User(request.body);
	user.save(function(error, user) {
		if(error)
			result.status(401).send(error); 
		result.json(user);
	});
};

//TODO: only for dev
exports.get_god_mode = function(request, result) {
	User.find({}, function(error, user) {
		if(error)
			result.send(error); 
		result.json(user);
	});
};