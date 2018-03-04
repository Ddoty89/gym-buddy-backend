const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

const {CLIENT_ORIGIN} = require('./config');

mongoose.Promise = global.Promise;

app.use(
  cors({
		origin: CLIENT_ORIGIN
  })
);

app.get('/', (req, res) => {
	res.json('hello world')
})

app.get('/testing', (req, res) => {
	res.json('this is a testing endpoint')
})



const PORT = process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
res.json({ok: true});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};