var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	pass: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');