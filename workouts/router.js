'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Workouts} = require('./models')

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/saved', jsonParser, (req, res) => {
	let {username, equipment, muscle, sets, repetitions, notes} = req.body ;
	sets = sets.trim()
	repetitions = repetitions.trim()
	notes = notes.trim()
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
	.catch({
		if(err) {
			return res.status(err.code).json(err);
		}
		// res.status(500).json({code:500, message:err})
	})
})

module.exports = {router};