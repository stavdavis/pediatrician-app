const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;
// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const {PORT, DATABASE_URL} = require('./config');
const Vaccine = require('./src/models/vaccine');

app.use(express.static('./src/public')); //to serve static index.html file
app.use(bodyParser.json());

// GET requests to /vaccines
app.get('/vaccines', (req, res) => {
  Vaccine
    .find()
    .then(vaccines => {
      res.json({
        vaccines: vaccines.map(
          (vaccine) => vaccine.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

// can also request by patientID
app.get('/vaccines/:patientId', (req, res) => {
  Vaccine
    .find({patientId: req.params.patientId})
    .then(vaccine =>res.json(vaccine.apiRepr()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

//ADDING A POST ENDPOINT
app.post('/vaccines', (req, res) => {
  const requiredFields = ['vaccineName', 'vaccineStatus', 'patientId', 'relatedDiseases'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Vaccine
    .create({
      vaccineName: req.body.vaccineName,
      vaccineStatus: req.body.vaccineStatus,
      patientName: req.body.patientName,
      patientId: req.body.patientId,
      relatedDiseases: req.body.relatedDiseases,
      dueDate: req.body.dueDate,
      doneDate: req.body.doneDate})
    .then(
      restaurant => res.status(201).json(restaurant.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

//ADDING PUT ENDPOINT
app.put('/vaccines/:id', (req, res) => {
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }
  // we only support a subset of fields being updateable.
  // if the user sent over any of the updatableFields, we udpate those values
  // in document
  const toUpdate = {};
  const updateableFields = ['vaccineStatus', 'dueDate', 'doneDate'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
  Vaccine
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(vaccine => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//ADDING DELETE ENDPOING
app.delete('/vaccines/:id', (req, res) => {
  Vaccine
    .findByIdAndRemove(req.params.id)
    .then(vaccine => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

//CREATING RUNSERVER AND CLOSESERVER (FOR TESTING)
// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
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

module.exports = {app, runServer, closeServer};
