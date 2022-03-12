const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RideSchema = new mongoose.Schema({
  missionId: {
    type: Schema.Types.ObjectId,
    ref: 'Mission'
  },
  patientId: [{
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  }],
  stationId: [{
    type: Schema.Types.ObjectId,
    ref: 'Station'
  }],
  departureTime: {
    type: String,
  },
  arrivingTime: {
    type: String,
  },
  departureCounter:{
    type: Number,
  },
  arrivalCounter: {
    type: Number,
  },
  subTotalDistance: {
    type: Number,
    min: 0
  },
  subTotalHour: {
    type: Number,
    min: 0
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

module.exports = mongoose.model('Ride', RideSchema)