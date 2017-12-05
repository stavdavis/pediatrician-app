const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;
app.use(morgan('common'));
// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const {PORT, DATABASE_URL} = require('./config');
const Vaccine = require('./src/models/vaccine');

app.use(express.static('./src/public')); //to serve static index.html file
app.use(bodyParser.json());

///////ENDPOINT ROUTING MANAGEMENT SECTION - START
const patientsRouter = require('./src/routers/patientsRouter');
app.use('/patients', patientsRouter);

const vaccinesRouter = require('./src/routers/vaccinesRouter');
app.use('/vaccines', vaccinesRouter);

const appointmentsRouter = require('./src/routers/appointmentsRouter');
app.use('/appointments', appointmentsRouter);

///////ENDPOINT ROUTING MANAGEMENT SECTION- END

///////CREATING RUNSERVER AND CLOSESERVER (FOR TESTING) SECTION - START
// closeServer needs a server object (assigned in `runServer`)
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
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

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};
///////CREATING RUNSERVER AND CLOSESERVER (FOR TESTING) SECTION - START

module.exports = {app, runServer, closeServer};