const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: Number, required: true },
  grade: { type: String, required: true },
  cgpa: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  enrollment_date: { type: String, required: true },
  status: { type: String, default: 'active' }
});

module.exports = mongoose.model('Student', StudentSchema);
