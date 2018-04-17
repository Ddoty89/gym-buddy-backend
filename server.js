const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const {PORT, CLIENT_ORIGIN, DATABASE_URL} = require('./config');

const { router: workoutRouter } = require('./workouts');
const { router: statsRouter } = require('./stats');
const { router: userRouter } = require('./user');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth')
const { router: muscleGroupRouter } = require('./muscleGroups')

mongoose.Promise = global.Promise;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/workouts', workoutRouter);
app.use('/api/stats', statsRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/muscles', muscleGroupRouter)

app.get('/api/fooooo', (req, res) => {
	res.json({ok: 'true'})
})

const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => {
	return res.json({
		data: 'rosebud'
	});
});

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};