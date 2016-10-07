var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDoSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	createdDt: {
		type: Date,
		default: Date.now
	},
	userId: {
		type: String,
		required: true
	}
});

// return the model
module.exports = mongoose.model('ToDo', ToDoSchema);