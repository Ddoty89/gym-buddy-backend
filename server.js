const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')

const {PORT, CLIENT_ORIGIN, DATABASE_URL} = require('./config');

const { router: workoutRouter } = require('./workouts');
const { router: statsRouter } = require('./stats');

mongoose.Promise = global.Promise;

app.use(
  cors({
		origin: CLIENT_ORIGIN
  })
);

app.use('/api/workouts', workoutRouter);
app.use('/api/stats', statsRouter);

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