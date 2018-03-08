'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Workouts} = require('./models')

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/saved', jsonParser, (req, res) => {
	let {username, equipment, muscle, sets, repetitions, notes} = req.body ;
	// sets = sets.trim()
	// repetitions = repetitions.trim()
	// notes = notes.trim()
	return Workouts.create({
		username, 
		equipment, 
		muscle, 
		sets, 
		repetitions, 
		notes
	})
	.then(workouts => {
		return res.status(201).json(workouts.seralize());
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
	// .then(workouts => {
	// 	res.json({
	// 		workouts : workouts.map(
	// 			workout => {workout.seralize()})
	// 	})
	// })

})

module.exports = {router};