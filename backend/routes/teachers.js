const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const { validateTeacher, checkValidation } = require('../middleware/validate');

// GET all teachers
router.get('/', async (req, res, next) => {
  try {
    const teachers = await Teacher.find({});
    res.json({
      status: 'success',
      results: teachers.length,
      data: teachers
    });
  } catch (error) {
    next(error);
  }
});

// GET single teacher
router.get('/:id', async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ id: parseInt(req.params.id, 10) });
    if (!teacher) {
      return res.status(404).json({
        status: 'error',
        message: `Teacher with ID ${req.params.id} not found`
      });
    }
    res.json({
      status: 'success',
      data: teacher
    });
  } catch (error) {
    next(error);
  }
});

// POST create teacher
router.post('/', validateTeacher, checkValidation, async (req, res, next) => {
  try {
    const { name, email, subject, experience_years, department, phone } = req.body;
    
    // Check uniqueness
    const emailCheck = await Teacher.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [{ field: 'email', message: 'Email address already in use' }]
      });
    }

    // Auto-increment integer id
    const maxTeacher = await Teacher.findOne().sort({ id: -1 });
    const nextId = maxTeacher ? maxTeacher.id + 1 : 1;

    const newTeacher = await Teacher.create({
      id: nextId,
      name,
      email,
      subject,
      experience_years,
      department,
      phone
    });

    res.status(201).json({
      status: 'success',
      data: newTeacher
    });
  } catch (error) {
    next(error);
  }
});

// PUT update teacher
router.put('/:id', validateTeacher, checkValidation, async (req, res, next) => {
  try {
    const { name, email, subject, experience_years, department, phone } = req.body;
    const teacherId = parseInt(req.params.id, 10);

    const teacher = await Teacher.findOne({ id: teacherId });
    if (!teacher) {
      return res.status(404).json({
        status: 'error',
        message: `Teacher with ID ${teacherId} not found`
      });
    }

    // Check uniqueness
    const emailCheck = await Teacher.findOne({ email, id: { $ne: teacherId } });
    if (emailCheck) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [{ field: 'email', message: 'Email address already in use by another teacher' }]
      });
    }

    teacher.name = name;
    teacher.email = email;
    teacher.subject = subject;
    teacher.experience_years = experience_years;
    teacher.department = department;
    teacher.phone = phone;

    await teacher.save();

    res.json({
      status: 'success',
      data: teacher
    });
  } catch (error) {
    next(error);
  }
});

// DELETE teacher
router.delete('/:id', async (req, res, next) => {
  try {
    const teacherId = parseInt(req.params.id, 10);
    const teacher = await Teacher.findOne({ id: teacherId });
    if (!teacher) {
      return res.status(404).json({
        status: 'error',
        message: `Teacher with ID ${teacherId} not found`
      });
    }

    await Teacher.deleteOne({ id: teacherId });

    res.json({
      status: 'success',
      message: `Teacher with ID ${teacherId} deleted successfully`
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
