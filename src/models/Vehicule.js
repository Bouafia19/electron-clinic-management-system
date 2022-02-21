const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const VehiculeSchema = new mongoose.Schema({
  model: {
    type: String,
  },
  licensePlate: {
    type: String,
  },
  driverId: {
    type: Schema.Types.ObjectId,
    ref: 'Driver'
  },
  assignmentDate: {
    type: Date,
  },
  chassisNumber: {
    type: String,
  },
  odometer: {
    type: Number,
  },
  photo: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Vehicule', VehiculeSchema)