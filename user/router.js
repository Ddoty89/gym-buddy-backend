'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
	let {username, firstName, lastName, email, password} = req.body;
	firstName = firstName.trim();
	lastName = lastName.trim();
	email = email.trim();
	
	return User.find({username})
		.count()
		.then(count => {
			if(count > 0) {
				return Promise.reject({
					code: 422,
					reason: 'ValidationError',
					message: 'username already taken',
					location: 'username'
				});
			}
			return User.hashPassword(password);
		})
		.then(hash => {
			return User.create({
				username,
				firstName,
				lastName,
				email,
				password: hash
			});
		})
		.then(user => {
			return res.status(201).json(user.serialize());
		})
		.catch(err => {
			if(err.reason === 'ValidationError') {
				return res.status(err.code).json(err);
			}
			res.status(500).json({code:500, message:err})
		});
});

router.get('/:username', (req, res) => {
	return User.find()
    .then(users => res.json(users.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = {router};