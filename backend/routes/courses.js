const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { validateCourse, checkValidation } = require('../middleware/validate');

// GET all courses
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find({});
    res.json({
      status: 'success',
      results: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
});

// GET single course
router.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findOne({ id: parseInt(req.params.id, 10) });
    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: `Course with ID ${req.params.id} not found`
      });
    }
    res.json({
      status: 'success',
      data: course
    });
  } catch (error) {
    next(error);
  }
});

// POST create course
router.post('/', validateCourse, checkValidation, async (req, res, next) => {
  try {
    const { course_name, department, duration_years, total_seats, fee_per_year } = req.body;
    
    // Check uniqueness
    const courseCheck = await Course.findOne({ course_name });
    if (courseCheck) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [{ field: 'course_name', message: 'Course name already exists' }]
      });
    }

    // Auto-increment integer id
    const maxCourse = await Course.findOne().sort({ id: -1 });
    const nextId = maxCourse ? maxCourse.id + 1 : 1;

    const newCourse = await Course.create({
      id: nextId,
      course_name,
      department,
      duration_years,
      total_seats,
      fee_per_year
    });

    res.status(201).json({
      status: 'success',
      data: newCourse
    });
  } catch (error) {
    next(error);
  }
});

// PUT update course
router.put('/:id', validateCourse, checkValidation, async (req, res, next) => {
  try {
    const { course_name, department, duration_years, total_seats, fee_per_year } = req.body;
    const courseId = parseInt(req.params.id, 10);

    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: `Course with ID ${courseId} not found`
      });
    }

    // Check uniqueness
    const courseCheck = await Course.findOne({ course_name, id: { $ne: courseId } });
    if (courseCheck) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [{ field: 'course_name', message: 'Course name already exists' }]
      });
    }

    course.course_name = course_name;
    course.department = department;
    course.duration_years = duration_years;
    course.total_seats = total_seats;
    course.fee_per_year = fee_per_year;

    await course.save();

    res.json({
      status: 'success',
      data: course
    });
  } catch (error) {
    next(error);
  }
});

// DELETE course
router.delete('/:id', async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id, 10);
    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: `Course with ID ${courseId} not found`
      });
    }

    await Course.deleteOne({ id: courseId });

    res.json({
      status: 'success',
      message: `Course with ID ${courseId} deleted successfully`
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
