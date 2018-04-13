'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const {MuscleGroups} = require('./models')

const router = express.Router();

const jsonParser = bodyParser.json();

// mongoose.Promise = global.Promise;
// const jwtAuth = passport.authenticate('jwt', { session: false });

// router.use(jwtAuth);

router.post('/possible-machines', jsonParser, (req, res) => {
	let {arms, back, chest, legs, core, cardio} = req.body ;
	return MuscleGroups.create({
		arms,
		back,
		chest,
		legs,
		core,
		cardio
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

router.get('/possible-machines', (req, res) => {
	return MuscleGroups.find()

	.then(muscles => res.json({muscles}))
	.catch(err => res.status(500).json({message: err}));
});

module.exports = {router};
