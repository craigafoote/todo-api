var bcrypt = require('bcryptjs');
var _ = require('underscore');

module.exports = function(sequilize, Datatypes){
	return sequilize.define('user', {
		email: {
			type: Datatypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				}
			},
		salt: {
			type: Datatypes.STRING
		},
		password_hash: {
			type: Datatypes.STRING
		},
		password: {
			type: Datatypes.VIRTUAL,
			allowNull: false,
			validate: {
				len: [7, 100]
			},
			set: function(value){
				var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(value, salt);

				this.setDataValue('password', value);
				this.setDataValue('salt',salt);
				this.setDataValue('password_hash', hashedPassword);
			}	
		}
	},{
		hooks: {
			beforeValidate: function(user,options){
					if(typeof user.email === 'string'){
						user.email = user.email.toLowerCase();
					}
				}
			},
		instanceMethods: {
			toPublicJSON: function(){
				var json = this.toJSON();
				return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
				}
			}
	});
}