var mongoose = require('mongoose');


var articleSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	createdAt:{
		type: String,
		required: true
	},
	updatedAt:{
		type: String,
		required: true
	},
	body:{
		type: String,
		required: true
	},
	archived:{
		type: Boolean,
		required: true
	}
});

var Article = module.exports = mongoose.model('Article' , articleSchema);