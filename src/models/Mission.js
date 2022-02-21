const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MissionSchema = new mongoose.Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  },
  vehiculeId: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicule'
  },
  station: {
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

module.exports = mongoose.model('Mission', MissionSchema)