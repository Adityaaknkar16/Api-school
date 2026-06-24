const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { validateStudent, checkValidation } = require('../middleware/validate');

// GET all students (with filter support)
router.get('/', async (req, res, next) => {
  try {
    const { course, status, city } = req.query;
    const filter = {};

    if (course) filter.course = course;
    if (status) filter.status = status;
    if (city) filter.city = city;

    const students = await Student.find(filter);

    res.json({
      status: 'success',
      results: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
});

// GET single student
router.get('/:id', async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    const student = await Student.findOne({ id: studentId });

    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: `Student with ID ${req.params.id} not found`
      });
    }

    res.json({
      status: 'success',
      data: student
    });
  } catch (error) {
    next(error);
  }
});

// POST create student
router.post('/', validateStudent, checkValidation, async (req, res, next) => {
  try {
    const { name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status } = req.body;
    
    // Check email uniqueness
    const emailCheck = await Student.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [{ field: 'email', message: 'Email address already in use' }]
      });
    }

    // Auto-increment integer id
    const maxStudent = await Student.findOne().sort({ id: -1 });
    const nextId = maxStudent ? maxStudent.id + 1 : 1;

    const newStudent = await Student.create({
      id: nextId,
      name,
      email,
      age,
      phone,
      course,
      semester,
      grade,
      cgpa,
      city,
      state,
      enrollment_date,
      status
    });

    res.status(201).json({
      status: 'success',
      data: newStudent
    });
  } catch (error) {
    next(error);
  }
});

// PUT update student
router.put('/:id', validateStudent, checkValidation, async (req, res, next) => {
  try {
    const { name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status } = req.body;
    const studentId = parseInt(req.params.id, 10);

    // Check if student exists
    const student = await Student.findOne({ id: studentId });
    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: `Student with ID ${studentId} not found`
      });
    }

    // Check email uniqueness
    const emailCheck = await Student.findOne({ email, id: { $ne: studentId } });
    if (emailCheck) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [{ field: 'email', message: 'Email address already in use by another student' }]
      });
    }

    student.name = name;
    student.email = email;
    student.age = age;
    student.phone = phone;
    student.course = course;
    student.semester = semester;
    student.grade = grade;
    student.cgpa = cgpa;
    student.city = city;
    student.state = state;
    student.enrollment_date = enrollment_date;
    student.status = status;

    await student.save();

    res.json({
      status: 'success',
      data: student
    });
  } catch (error) {
    next(error);
  }
});

// DELETE student
router.delete('/:id', async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    const student = await Student.findOne({ id: studentId });
    if (!student) {
      return res.status(404).json({
        status: 'error',
        message: `Student with ID ${studentId} not found`
      });
    }

    await Student.deleteOne({ id: studentId });

    res.json({
      status: 'success',
      message: `Student with ID ${studentId} deleted successfully`
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
