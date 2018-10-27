var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//my models
var Article = require('./models/article');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/dbtest');
var db = mongoose.connection;

//Check db errors
db.on('error', function(err){
	console.log(err);
})

app.get('/',  function (req, res){
	Article.find({},function(err,articles){
		var data = [{
			"status" : 200,
			"message" : "OK",
			"result" : articles
		}];
		res.send(data);
	});
});

app.post('/articles/create', function(req,res){
	var article = new Article();
	var D = new Date(Date.now());
	var curDate = D.getFullYear()+'-'+(D.getMonth()+1)+'-'+D.getDate();
	
	//assign new article data
	article.title = req.header('title');
	article.createdAt = curDate;
	article.updatedAt = curDate;
	article.body = req.header('body');
	article.archived = false;

	//save the article to database and handle the errors
	article.save(function(err){
		if (err){
			var data = [{
				"status" : 300,
				"message" : "error",
				"result" : null
			}];
			res.send(data);
		} else {
			var data = [{
				"status" : 200,
				"message" : "OK",
				"result" : null
			}];
			res.send(data);
		}
	});
});

app.get('/articles/read/:id', function(req,res){
	var id = req.params.id;
	Article.findById(id,function(err, article){
		var data = [{
			"status" : 200,
			"message" : "OK",
			"result" : article
		}];
		res.send(data);
	});
});

app.listen(3000, function(){
	console.log('server started on port 3000')
});
