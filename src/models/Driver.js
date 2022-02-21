const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  driverLicenseNumber: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  experationDate: {
    type: Date,
  },
  mobile: {
    type: String,
  },
  photo: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  country: {
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

module.exports = mongoose.model('Driver', DriverSchema)