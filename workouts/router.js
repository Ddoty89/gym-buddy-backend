'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const {Workouts} = require('./models')

const router = express.Router();

const jsonParser = bodyParser.json();

// mongoose.Promise = global.Promise;
// const jwtAuth = passport.authenticate('jwt', { session: false });

// router.use(jwtAuth);

router.post('/saved', jsonParser, (req, res) => {
	let {username, equipment, muscle, sets, repetitions, weight, notes} = req.body ;
	return Workouts.create({
		username, 
		equipment, 
		muscle, 
		sets, 
		repetitions,
		weight,
		notes
	})
	.then(workouts => {
		return res.status(201).json(workouts.serialize());
	}) 
	.catch(err => {
		if(err.reason === 'ValidationError') {
			return res.status(err.code).json(err);
		}
		res.status(500).json({code: 500, message: err});
	});
});

router.get('/saved', (req, res) => {
	Workouts
	.find()
	.then(workouts => res.json({workouts}))
	.catch(err => res.status(500).json({message: err}));
});

module.exports = {router};







