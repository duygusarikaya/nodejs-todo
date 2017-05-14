var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
	userId: {
		type: String,
		Required: 'User binding is required'
	},
	title: {
		type: String,
		Required: 'Title is required.'
	},
	details: {
		type: String,
		default: '...'
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	state: {
		type: {
			type: String,
			enum: ['open', 'inprogress', 'done']
		},
		default: ['open']
	}
});
mongoose.model('Todo', TodoSchema);

module.exports = mongoose.model('Todo');