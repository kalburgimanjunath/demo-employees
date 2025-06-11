// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  class: String,
  subjects: [String],
  attendance: String,
});

module.exports = mongoose.model('Employee', employeeSchema);
