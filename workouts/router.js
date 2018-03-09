'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Stats} = require('./models')

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/personal-stats', jsonParser, (req, res) => {
	let {username, gender, height, weight, goals, mileTime, notes} = req.body ;
	// sets = sets.trim()
	// repetitions = repetitions.trim()
	// notes = notes.trim()
	return Stats.create({
		username,
		gender,
		height,
		weight,
		goals,
		mileTime,
		notes
	})
	.then(stats => {
		return res.status(201).json(stats.serialize());
	}) 
	.catch(err => {
		if(err.reason === 'ValidationError') {
			return res.status(err.code).json(err);
		}
		res.status(500).json({code: 500, message: err});
	});
});

router.get('/personal-stats', (req, res) => {
	Stats
	.find()
	.then(stats => res.json({stats}))
	.catch(err => res.status(500).json({message: err}));
});

module.exports = {router};







