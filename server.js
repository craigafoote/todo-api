var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: "Meet mom for lunch",
	completed: false
},{
	id: 2, 
	description: "go to market",
	completed: false
},{
	id: 3, 
	description: "Give the dog a bath",
	completed: true
}];

app.get('/', function(req,res){
	res.send('Todo API Root');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id',function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedToDo;

	for(var i = 0; i < todos.length; i++){
		if(todos[i].id === todoId){
			matchedToDo = todos[i];
		};
	}
	if(matchedToDo){
		res.json(matchedToDo);
	} else {
		res.status(404).send();		
	}

});

app.listen(PORT, function(){
	console.log("Express listening on port" + PORT);
});