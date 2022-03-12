const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const MissionSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  vehiculeId: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicule'
  },
  driverId: {
    type: Schema.Types.ObjectId,
    ref: 'Driver'
  },
  date: {
    type: Date,
    default: Date.now,
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  totalPatients: {
    type: Number,
    default: 0,
    min: 0
  },
  totalDistances: {
    type: Number,
    default: 0,
    min: 0
  },
  totalHours: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model('Mission', MissionSchema)