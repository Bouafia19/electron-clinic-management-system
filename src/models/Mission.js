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