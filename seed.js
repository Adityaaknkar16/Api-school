const db = require('./database');

const { students } = require('./students.json');
const { courses } = require('./courses.json');
const { teachers } = require('./teachers.json');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age INTEGER,
  phone TEXT,
  course TEXT,
  semester INTEGER,
  grade TEXT,
  cgpa REAL,
  city TEXT,
  state TEXT,
  enrollment_date TEXT,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_name TEXT NOT NULL,
  department TEXT,
  duration_years INTEGER,
  total_seats INTEGER,
  fee_per_year REAL
);

CREATE TABLE IF NOT EXISTS teachers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  subject TEXT,
  experience_years INTEGER,
  department TEXT,
  phone TEXT
);
`;

function seedDatabase() {
  db.exec(SCHEMA);

  const { count } = db.prepare('SELECT COUNT(*) AS count FROM students').get();
  if (count > 0) {
    console.log('Database already seeded, skipping...');
    return;
  }

  const insertStudent = db.prepare(`
    INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status)
    VALUES (@id, @name, @email, @age, @phone, @course, @semester, @grade, @cgpa, @city, @state, @enrollment_date, @status)
  `);

  const insertCourse = db.prepare(`
    INSERT INTO courses (id, course_name, department, duration_years, total_seats, fee_per_year)
    VALUES (@id, @course_name, @department, @duration_years, @total_seats, @fee_per_year)
  `);

  const insertTeacher = db.prepare(`
    INSERT INTO teachers (id, name, email, subject, experience_years, department, phone)
    VALUES (@id, @name, @email, @subject, @experience_years, @department, @phone)
  `);

  const seedAll = () => {
    students.forEach((student) => insertStudent.run(student));
    courses.forEach((course) => insertCourse.run(course));
    teachers.forEach((teacher) => insertTeacher.run(teacher));
  };

  db.exec('BEGIN');
  try {
    seedAll();
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
  console.log('Database seeded successfully');
}

module.exports = seedDatabase;
