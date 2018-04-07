'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const {Workouts, WorkedMuscles} = require('./models')

const router = express.Router();

const jsonParser = bodyParser.json();

// mongoose.Promise = global.Promise;
// const jwtAuth = passport.authenticate('jwt', { session: false });

// router.use(jwtAuth);

router.post('/saved', jsonParser, (req, res) => {
	let {username, workoutTitle, exerciseList} = req.body ;
	return Workouts.create({
		username,
		workoutTitle,
		exerciseList 
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

router.get('/saved/:username', (req, res) => {
	Workouts
	.find({username: req.params.username})
	.then(workouts => res.json({workouts}))
	.catch(err => res.status(500).json({message: err}));
});

module.exports = {router};


router.post('/muscles', jsonParser, (req, res) => {
	let {barbellSquat, benchPress, dumbellCurl, gymMatCrunch, inclineBenchPress, pullUpBar} = req.body ;
	return WorkedMuscles.create({
		barbellSquat,
		benchPress,
		dumbellCurl,
		gymMatCrunch,
		inclineBenchPress,
		pullUpBar
	})
	.then(muscles => {
		return res.status(201).json(muscles.serialize());
	}) 
	.catch(err => {
		if(err.reason === 'ValidationError') {
			return res.status(err.code).json(err);
		}
		res.status(500).json({code: 500, message: err});
	});
});

router.get('/muscles', (req, res) => {
	return WorkedMuscles.find()

	.then(muscles => res.json({muscles}))
	.catch(err => res.status(500).json({message: err}));
});

module.exports = {router};




