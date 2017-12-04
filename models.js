const mongoose = require('mongoose');

// this is our schema to represent a vaccine
const vaccineSchema = mongoose.Schema({
  vaccineName: {type: String, required: true},
  vaccineStatus: {type: String, required: true}, //"Done" or "Not yet"
  patientName: {type: String},
  patientId: {type: Number, required: true},
  relatedDiseases: {type: String, required: true},
  dueDate: {type: Date},
  doneDate: {type: Date} 
});

// virtuals define object properties that are nicer representations of db properties (via apiRepr below)
// vaccineSchema.virtual('vaccineString').get(function() {
//   return `${this.address.building} ${this.address.street}`.trim()});

//Manipulating the representation of the returned API data:
vaccineSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    vaccineName: this.vaccineName,
    patientId: this.patientId,
    relatedDiseases: this.relatedDiseases,
    dueDate: this.dueDate,
    doneDate: this.doneDate
  };
}

const Vaccine = mongoose.model('Vaccine', vaccineSchema);

module.exports = {Vaccine};