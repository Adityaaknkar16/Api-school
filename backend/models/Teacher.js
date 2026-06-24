const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  experience_years: { type: Number, required: true },
  department: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model('Teacher', TeacherSchema);
