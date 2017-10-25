var express = require('express');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;
var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('Todo API Root');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id',function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedToDo = _.findWhere(todos, {id: todoId});

	if(matchedToDo){
		res.json(matchedToDo);
	} else {
		res.status(404).send();		
	}

});

app.post('/todos', function(req, res){
	var body = _.pick(req.body, 'description','completed'); 

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();

	body.id = todoNextId;
	todoNextId++;
	todos.push(body);
	res.json(body);
});

app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedToDo = _.findWhere(todos, {id: todoId});

	if(matchedToDo){
		todos = _.without(todos, matchedToDo);
		res.json(matchedToDo);
	} else {
		res.status(404).json({"error" : "no todo found with that id"});		
	}
});

app.put('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedToDo = _.findWhere(todos, {id: todoId});

	var body = _.pick(req.body, 'description','completed'); 
	var validAttributes = {};

	if(!matchedToDo){
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	} else if(body.hasOwnProperty('completed')){
		return res.status(400).send();
	} 

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0 ){
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')){
		return res.status(400).send();
	} 

	_.extend(matchedToDo, validAttributes);
	res.json(matchedToDo);
});



app.listen(PORT, function(){
	console.log("Express listening on port " + PORT);
});