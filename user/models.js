'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String, 
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		default: ''
	},
	lastName: { 
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		required: true
	},
	height: {
		type: String,
		default: ''
	},
	gender: {
		type: String,
		default: ''
	}
});

UserSchema.methods.serialize = function () {
	return {
		username: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || '',
		email: this.email || '',
		gender: this.gender || '',
		height: this.height || ''
	};
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = {User}