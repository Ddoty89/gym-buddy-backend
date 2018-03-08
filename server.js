const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

const {PORT, CLIENT_ORIGIN} = require('./config');

const { router: workoutRouter } = require('./workouts')

mongoose.Promise = global.Promise;

app.use(
  cors({
		origin: CLIENT_ORIGIN
  })
);

app.use('/api/workouts', workoutRouter);

app.get('/', (req, res) => {
	res.json('hello world')
})

app.get('/testing', (req, res) => {
	res.json('this is a testing endpoint')
})

app.get('/api/fooooo', (req, res) => {
res.json({ok: true});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};