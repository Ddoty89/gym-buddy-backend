'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose')

const {Stats} = require('./models')

const router = express.Router();

const jsonParser = bodyParser.json();

// mongoose.Promise = global.Promise;
// const jwtAuth = passport.authenticate('jwt', { session: false });

// router.use(jwtAuth);

router.post('/personal-stats', jsonParser, (req, res) => {
	let {username, weight, goals, mileTime, date, notes} = req.body;
	console.log(req.body)
	return Stats.create({
		username,
		weight,
		goals,
		mileTime,
		date,
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

