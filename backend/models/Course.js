const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  course_name: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  duration_years: { type: Number, required: true },
  total_seats: { type: Number, required: true },
  fee_per_year: { type: Number, required: true }
});

module.exports = mongoose.model('Course', CourseSchema);
