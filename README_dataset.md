# API Playground — Practice Dataset

Realistic Indian college data for practicing CRUD operations, filtering, joins, and query building in the API Playground.

## Files

| File | Description |
|------|-------------|
| `students.json` | 50 student records |
| `courses.json` | 8 course records |
| `teachers.json` | 10 teacher records |
| `seed.sql` | SQLite schema + INSERT statements for all 3 tables |
| `seed.js` | Node.js auto-seeder (runs on server start) |
| `database.js` | SQLite connection helper used by `seed.js` |

## Quick Start

### Option 1 — JSON (REST mock / file-based APIs)

Load the JSON files directly in your API layer or mock server.

### Option 2 — SQL file

```bash
sqlite3 school.db < seed.sql
```

### Option 3 — Node.js auto-seed

Requires **Node.js 22.5+** (uses built-in `node:sqlite`).

```bash
npm run seed
```

Call `require('./seed')()` from your server startup:

```javascript
const seedDatabase = require('./seed');

seedDatabase(); // skips if students table already has rows
```

---

## Table: `students` (50 records)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | INTEGER | Primary key | `1` |
| `name` | TEXT | Full name (Indian names) | `Aditya Sharma` |
| `email` | TEXT | Unique email | `aditya.sharma@example.com` |
| `age` | INTEGER | Student age | `20` |
| `phone` | TEXT | 10-digit Indian mobile | `9876543210` |
| `course` | TEXT | Enrolled course | `Computer Science` |
| `semester` | INTEGER | Current semester (1–8) | `3` |
| `grade` | TEXT | Latest grade | `A`, `B+`, `F` |
| `cgpa` | REAL | Cumulative GPA (4.5–9.8) | `8.7` |
| `city` | TEXT | Home city | `Pune` |
| `state` | TEXT | Home state | `Maharashtra` |
| `enrollment_date` | TEXT | ISO date (`YYYY-MM-DD`) | `2023-08-01` |
| `status` | TEXT | Enrollment status | `active` |

### Data variety

- **Courses (even spread):** Computer Science (7), Information Technology (7), Electronics & Communication (6), Mechanical Engineering (6), Civil Engineering (6), Data Science (6), MBA (6), BCA (6)
- **Grades:** A+, A, B+, B, C+, C, F — includes 4 failing students
- **Semesters:** 1 through 8
- **Status:** `active` (30), `inactive` (8), `graduated` (8), `dropped` (4)
- **Cities:** Pune, Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Jaipur, Ahmedabad, Nagpur

---

## Table: `courses` (8 records)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | INTEGER | Primary key | `1` |
| `course_name` | TEXT | Course title | `Computer Science` |
| `department` | TEXT | Academic department | `Engineering` |
| `duration_years` | INTEGER | Program length | `4` |
| `total_seats` | INTEGER | Intake capacity | `60` |
| `fee_per_year` | REAL | Annual fee in INR | `85000` |

---

## Table: `teachers` (10 records)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | INTEGER | Primary key | `1` |
| `name` | TEXT | Full name with title | `Dr. Priya Kulkarni` |
| `email` | TEXT | Unique college email | `priya.kulkarni@college.com` |
| `subject` | TEXT | Primary subject taught | `Data Structures` |
| `experience_years` | INTEGER | Years of teaching | `12` |
| `department` | TEXT | Department | `Computer Science` |
| `phone` | TEXT | 10-digit mobile | `9823456710` |

---

## Sample Queries to Practice

### Basic CRUD

```sql
-- READ all active students
SELECT * FROM students WHERE status = 'active';

-- READ one student by ID
SELECT * FROM students WHERE id = 1;

-- CREATE a new student
INSERT INTO students (name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status)
VALUES ('Test Student', 'test.student@example.com', 19, '9123456789', 'BCA', 1, 'B', 7.2, 'Pune', 'Maharashtra', '2025-06-01', 'active');

-- UPDATE a student grade
UPDATE students SET grade = 'A', cgpa = 8.5 WHERE id = 10;

-- DELETE a dropped student
DELETE FROM students WHERE id = 47 AND status = 'dropped';
```

### Filtering & sorting

```sql
-- Students in Computer Science with CGPA above 8
SELECT name, email, cgpa FROM students
WHERE course = 'Computer Science' AND cgpa > 8
ORDER BY cgpa DESC;

-- Failing students (grade F)
SELECT name, course, cgpa, status FROM students WHERE grade = 'F';

-- Students from Maharashtra
SELECT name, city, course FROM students WHERE state = 'Maharashtra';

-- Graduated students in semester 8
SELECT name, course, cgpa FROM students
WHERE status = 'graduated' AND semester = 8;
```

### Aggregation

```sql
-- Average CGPA by course
SELECT course, ROUND(AVG(cgpa), 2) AS avg_cgpa, COUNT(*) AS total
FROM students
GROUP BY course
ORDER BY avg_cgpa DESC;

-- Count students by status
SELECT status, COUNT(*) AS count FROM students GROUP BY status;

-- Students per city
SELECT city, state, COUNT(*) AS student_count
FROM students
GROUP BY city, state
ORDER BY student_count DESC;
```

### Joins (advanced)

```sql
-- Students with their course fee info
SELECT s.name, s.course, c.department, c.fee_per_year, s.cgpa
FROM students s
JOIN courses c ON s.course = c.course_name
WHERE s.status = 'active';

-- Teachers and students in the same department
SELECT t.name AS teacher, t.subject, s.name AS student, s.course
FROM teachers t
JOIN students s ON t.department = s.course
WHERE s.status = 'active'
LIMIT 20;

-- Courses with more than 6 enrolled students
SELECT c.course_name, c.total_seats, COUNT(s.id) AS enrolled
FROM courses c
LEFT JOIN students s ON c.course_name = s.course
GROUP BY c.id
HAVING enrolled >= 6;
```

### REST API practice ideas

| Method | Endpoint | Practice goal |
|--------|----------|---------------|
| `GET` | `/students` | List all, pagination |
| `GET` | `/students?course=MBA&status=active` | Query filters |
| `GET` | `/students/1` | Read by ID |
| `POST` | `/students` | Create with validation |
| `PUT` | `/students/1` | Full update |
| `PATCH` | `/students/1` | Partial update (e.g. grade only) |
| `DELETE` | `/students/1` | Delete by ID |
| `GET` | `/courses` | List courses |
| `GET` | `/teachers?department=Computer Science` | Filter teachers |

---

## Notes

- All names, emails, and phone numbers are **fake but realistic** — safe for practice.
- No duplicate emails or phone numbers across students or teachers.
- Set `DB_PATH` environment variable to change the SQLite file location (default: `./school.db`).
