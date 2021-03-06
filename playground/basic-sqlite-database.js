var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});


var Todo = sequelize.define('todo',{
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})

sequelize.sync().then(function(){
	console.log('everything is synced');
	Todo.findById(1).then(function(todo){
		console.log(todo.toJSON());
	}).catch(function(e){
		console.log(e);
	});

	// Todo.create({
	// 	description: 'Walking my dog',
	// 	completed: false
	// }).then(function(todo){
	// 	return Todo.create({
	// 		description: 'Go to the gym'
	// 	}).then(function(){
	// 		//return Todo.findById(1)
	// 		return Todo.findAll({
	// 			where: {
	// 				description: {
	// 					$like: '%dog%'
	// 				}
	// 			}
	// 		});
	// 	}).then(function(todos){
	// 		if(todos){
	// 			todos.forEach(function(todo){
	// 				console.log(todo.toJSON());
	// 			});
	// 		} else {
	// 			console.log('no todo found!');
	// 		}
	// 	})
	// }).catch(function(e){
	// 	console.log(e);
	// });
});