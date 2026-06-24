const Student = require('../models/Student');
const Course = require('../models/Course');
const Teacher = require('../models/Teacher');

const studentsData = require('./students.json').students;
const coursesData = require('./courses.json').courses;
const teachersData = require('./teachers.json').teachers;

async function seedDatabase(force = false) {
  try {
    const studentCount = await Student.countDocuments();
    if (studentCount > 0 && !force) {
      console.log('MongoDB database already seeded, skipping...');
      return;
    }

    console.log('Seeding MongoDB database...');
    
    // Drop existing collections to avoid key conflicts
    await Student.deleteMany({});
    await Course.deleteMany({});
    await Teacher.deleteMany({});

    // Bulk inserts
    await Student.insertMany(studentsData);
    await Course.insertMany(coursesData);
    await Teacher.insertMany(teachersData);

    console.log('MongoDB database seeded successfully.');
  } catch (error) {
    console.error('Seeding MongoDB failed:', error);
    throw error;
  }
}

module.exports = seedDatabase;
