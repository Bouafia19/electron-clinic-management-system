const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ScheduleSchema = new mongoose.Schema({
  driverId: {
    type: Schema.Types.ObjectId,
    ref: 'Driver'
  },
  patientId: [{
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  }],
  period: {
    type: String,
  },
  team: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  color: {
    type: String,
  },
  timed: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('Schedule', ScheduleSchema)