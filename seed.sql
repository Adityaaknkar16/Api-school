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

INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (1, 'Aditya Sharma', 'aditya.sharma@example.com', 20, '9876543210', 'Computer Science', 3, 'A', 8.7, 'Pune', 'Maharashtra', '2023-08-01', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (2, 'Priya Desai', 'priya.desai2@example.com', 19, '9802469134', 'Computer Science', 2, 'A', 8.2, 'Mumbai', 'Maharashtra', '2022-03-07', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (3, 'Rahul Nair', 'rahul.nair3@example.com', 20, '9803703701', 'Computer Science', 3, 'A', 8.3, 'Delhi', 'Delhi', '2023-10-10', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (4, 'Ananya Reddy', 'ananya.reddy4@example.com', 21, '9804938268', 'Computer Science', 4, 'B+', 7.4, 'Bangalore', 'Karnataka', '2024-05-13', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (5, 'Vikram Chopra', 'vikram.chopra5@example.com', 22, '9806172835', 'Computer Science', 5, 'B+', 7.5, 'Hyderabad', 'Telangana', '2020-12-16', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (6, 'Meera Banerjee', 'meera.banerjee6@example.com', 23, '9807407402', 'Computer Science', 6, 'B', 6.5, 'Chennai', 'Tamil Nadu', '2021-07-19', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (7, 'Arjun Pillai', 'arjun.pillai7@example.com', 24, '9808641969', 'Computer Science', 7, 'B', 6.6, 'Kolkata', 'West Bengal', '2022-02-22', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (8, 'Kavita Tiwari', 'kavita.tiwari8@example.com', 25, '9809876536', 'Information Technology', 8, 'C+', 5.8, 'Jaipur', 'Rajasthan', '2023-09-25', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (9, 'Rohit Dubey', 'rohit.dubey9@example.com', 18, '9811111103', 'Information Technology', 1, 'C+', 5.9, 'Ahmedabad', 'Gujarat', '2024-04-28', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (10, 'Sunita Thakur', 'sunita.thakur10@example.com', 20, '9812345670', 'Information Technology', 2, 'C', 4.5, 'Nagpur', 'Maharashtra', '2020-11-03', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (11, 'Deepak Jadhav', 'deepak.jadhav11@example.com', 21, '9813580237', 'Information Technology', 3, 'A+', 9.1, 'Pune', 'Maharashtra', '2021-06-06', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (12, 'Neha Gowda', 'neha.gowda12@example.com', 22, '9814814804', 'Information Technology', 4, 'A', 8.2, 'Mumbai', 'Maharashtra', '2022-01-09', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (13, 'Amit Yadav', 'amit.yadav13@example.com', 23, '9816049371', 'Information Technology', 5, 'B+', 7.3, 'Delhi', 'Delhi', '2023-08-12', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (14, 'Pooja Roy', 'pooja.roy14@example.com', 24, '9817283938', 'Information Technology', 6, 'B', 6.4, 'Bangalore', 'Karnataka', '2024-03-15', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (15, 'Sanjay Ghosh', 'sanjay.ghosh15@example.com', 25, '9818518505', 'Electronics & Communication', 7, 'F', 4.7, 'Hyderabad', 'Telangana', '2020-10-18', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (16, 'Divya Solanki', 'divya.solanki16@example.com', 26, '9819753072', 'Electronics & Communication', 8, 'A', 8.5, 'Chennai', 'Tamil Nadu', '2021-05-21', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (17, 'Karan Sharma', 'karan.sharma17@example.com', 19, '9820987639', 'Electronics & Communication', 1, 'B+', 7.6, 'Kolkata', 'West Bengal', '2022-12-24', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (18, 'Shruti Iyer', 'shruti.iyer18@example.com', 20, '9822222206', 'Electronics & Communication', 2, 'C', 5.2, 'Jaipur', 'Rajasthan', '2023-07-27', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (19, 'Nikhil Kulkarni', 'nikhil.kulkarni19@example.com', 21, '9823456773', 'Electronics & Communication', 3, 'A+', 9.7, 'Ahmedabad', 'Gujarat', '2024-02-02', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (20, 'Riya Rao', 'riya.rao20@example.com', 23, '9824691340', 'Electronics & Communication', 4, 'B', 6, 'Nagpur', 'Maharashtra', '2020-09-05', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (21, 'Varun Verma', 'varun.verma21@example.com', 24, '9825925907', 'Mechanical Engineering', 5, 'A', 8.1, 'Pune', 'Maharashtra', '2021-04-08', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (22, 'Anjali Malhotra', 'anjali.malhotra22@example.com', 25, '9827160474', 'Mechanical Engineering', 6, 'B+', 7.2, 'Mumbai', 'Maharashtra', '2022-11-11', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (23, 'Manish Chatterjee', 'manish.chatterjee23@example.com', 26, '9828395041', 'Mechanical Engineering', 7, 'C+', 5.6, 'Delhi', 'Delhi', '2023-06-14', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (24, 'Kritika Menon', 'kritika.menon24@example.com', 27, '9829629608', 'Mechanical Engineering', 8, 'F', 4.7, 'Bangalore', 'Karnataka', '2024-01-17', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (25, 'Harsh Mishra', 'harsh.mishra25@example.com', 20, '9830864175', 'Mechanical Engineering', 1, 'A', 8.5, 'Hyderabad', 'Telangana', '2020-08-20', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (26, 'Swati Shah', 'swati.shah26@example.com', 21, '9832098742', 'Mechanical Engineering', 2, 'B', 6.5, 'Chennai', 'Tamil Nadu', '2021-03-23', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (27, 'Gaurav Naik', 'gaurav.naik27@example.com', 22, '9833333309', 'Civil Engineering', 3, 'C+', 5.8, 'Kolkata', 'West Bengal', '2022-10-26', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (28, 'Nidhi More', 'nidhi.more28@example.com', 23, '9834567876', 'Civil Engineering', 4, 'A+', 9.6, 'Jaipur', 'Rajasthan', '2023-05-01', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (29, 'Akash Shetty', 'akash.shetty29@example.com', 24, '9835802443', 'Civil Engineering', 5, 'B+', 7.8, 'Ahmedabad', 'Gujarat', '2024-12-04', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (30, 'Tanvi Khan', 'tanvi.khan30@example.com', 26, '9837037010', 'Civil Engineering', 6, 'A', 8, 'Nagpur', 'Maharashtra', '2020-07-07', 'active');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (31, 'Rohan Bose', 'rohan.bose31@example.com', 27, '9838271577', 'Civil Engineering', 7, 'B', 6.1, 'Pune', 'Maharashtra', '2021-02-10', 'inactive');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (32, 'Isha Chauhan', 'isha.chauhan32@example.com', 28, '9839506144', 'Civil Engineering', 8, 'C', 4.7, 'Mumbai', 'Maharashtra', '2022-09-13', 'inactive');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (33, 'Pranav Modi', 'pranav.modi33@example.com', 21, '9840740711', 'Data Science', 1, 'A', 8.3, 'Delhi', 'Delhi', '2023-04-16', 'inactive');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (34, 'Aishwarya Patel', 'aishwarya.patel34@example.com', 22, '9841975278', 'Data Science', 2, 'B+', 7.4, 'Bangalore', 'Karnataka', '2024-11-19', 'inactive');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (35, 'Yash Gupta', 'yash.gupta35@example.com', 23, '9843209845', 'Data Science', 3, 'F', 4.7, 'Hyderabad', 'Telangana', '2020-06-22', 'inactive');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (36, 'Simran Mehta', 'simran.mehta36@example.com', 24, '9844444412', 'Data Science', 4, 'A+', 9.5, 'Chennai', 'Tamil Nadu', '2021-01-25', 'inactive');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (37, 'Abhishek Joshi', 'abhishek.joshi37@example.com', 25, '9845678979', 'Data Science', 5, 'A', 8.6, 'Kolkata', 'West Bengal', '2022-08-28', 'inactive');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (38, 'Preeti Kapoor', 'preeti.kapoor38@example.com', 26, '9846913546', 'Data Science', 6, 'B+', 7.7, 'Jaipur', 'Rajasthan', '2023-03-03', 'inactive');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (39, 'Siddharth Agarwal', 'siddharth.agarwal39@example.com', 27, '9848148113', 'MBA', 7, 'B', 6.8, 'Ahmedabad', 'Gujarat', '2024-10-06', 'graduated');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (40, 'Komal Mukherjee', 'komal.mukherjee40@example.com', 29, '9849382680', 'MBA', 8, 'C+', 5.5, 'Nagpur', 'Maharashtra', '2020-05-09', 'graduated');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (41, 'Vivek Saxena', 'vivek.saxena41@example.com', 22, '9850617247', 'MBA', 1, 'A', 8.1, 'Pune', 'Maharashtra', '2021-12-12', 'graduated');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (42, 'Radha Pandey', 'radha.pandey42@example.com', 23, '9851851814', 'MBA', 2, 'B', 6.2, 'Mumbai', 'Maharashtra', '2022-07-15', 'graduated');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (43, 'Ashwin Bhatt', 'ashwin.bhatt43@example.com', 24, '9853086381', 'MBA', 3, 'C', 4.8, 'Delhi', 'Delhi', '2023-02-18', 'graduated');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (44, 'Lakshmi Kadam', 'lakshmi.kadam44@example.com', 25, '9854320948', 'MBA', 4, 'A+', 9.3, 'Bangalore', 'Karnataka', '2024-09-21', 'graduated');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (45, 'Suresh Patil', 'suresh.patil45@example.com', 26, '9855555515', 'BCA', 5, 'B+', 7.5, 'Hyderabad', 'Telangana', '2020-04-24', 'graduated');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (46, 'Bhavna Naidu', 'bhavna.naidu46@example.com', 27, '9856790082', 'BCA', 6, 'A', 8.5, 'Chennai', 'Tamil Nadu', '2021-11-27', 'graduated');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (47, 'Rajat Das', 'rajat.das47@example.com', 28, '9858024649', 'BCA', 7, 'B', 6.6, 'Kolkata', 'West Bengal', '2022-06-02', 'dropped');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (48, 'Madhuri Sen', 'madhuri.sen48@example.com', 29, '9859259216', 'BCA', 8, 'C+', 5.8, 'Jaipur', 'Rajasthan', '2023-01-05', 'dropped');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (49, 'Kunal Rathore', 'kunal.rathore49@example.com', 22, '9860493783', 'BCA', 1, 'F', 4.9, 'Ahmedabad', 'Gujarat', '2024-08-08', 'dropped');
INSERT INTO students (id, name, email, age, phone, course, semester, grade, cgpa, city, state, enrollment_date, status) VALUES (50, 'Devika Trivedi', 'devika.trivedi50@example.com', 24, '9861728350', 'BCA', 2, 'A', 8, 'Nagpur', 'Maharashtra', '2020-03-11', 'dropped');

INSERT INTO courses (id, course_name, department, duration_years, total_seats, fee_per_year) VALUES (1, 'Computer Science', 'Engineering', 4, 60, 85000);
INSERT INTO courses (id, course_name, department, duration_years, total_seats, fee_per_year) VALUES (2, 'Information Technology', 'Engineering', 4, 55, 82000);
INSERT INTO courses (id, course_name, department, duration_years, total_seats, fee_per_year) VALUES (3, 'Electronics & Communication', 'Engineering', 4, 50, 80000);
INSERT INTO courses (id, course_name, department, duration_years, total_seats, fee_per_year) VALUES (4, 'Mechanical Engineering', 'Engineering', 4, 60, 78000);
INSERT INTO courses (id, course_name, department, duration_years, total_seats, fee_per_year) VALUES (5, 'Civil Engineering', 'Engineering', 4, 45, 75000);
INSERT INTO courses (id, course_name, department, duration_years, total_seats, fee_per_year) VALUES (6, 'Data Science', 'Science', 3, 40, 95000);
INSERT INTO courses (id, course_name, department, duration_years, total_seats, fee_per_year) VALUES (7, 'MBA', 'Management', 2, 80, 120000);
INSERT INTO courses (id, course_name, department, duration_years, total_seats, fee_per_year) VALUES (8, 'BCA', 'Computer Applications', 3, 50, 65000);

INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (1, 'Dr. Priya Kulkarni', 'priya.kulkarni@college.com', 'Data Structures', 12, 'Computer Science', '9823456710');
INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (2, 'Prof. Rajesh Mehta', 'rajesh.mehta@college.com', 'Database Management', 15, 'Information Technology', '9834567120');
INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (3, 'Dr. Ananya Iyer', 'ananya.iyer@college.com', 'Digital Signal Processing', 10, 'Electronics & Communication', '9845671230');
INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (4, 'Prof. Vikram Singh', 'vikram.singh@college.com', 'Thermodynamics', 18, 'Mechanical Engineering', '9856712340');
INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (5, 'Dr. Meera Patel', 'meera.patel@college.com', 'Structural Analysis', 14, 'Civil Engineering', '9867123450');
INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (6, 'Prof. Arjun Nair', 'arjun.nair@college.com', 'Machine Learning', 8, 'Data Science', '9871234560');
INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (7, 'Dr. Kavita Desai', 'kavita.desai@college.com', 'Financial Management', 20, 'MBA', '9812345670');
INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (8, 'Prof. Rohit Gupta', 'rohit.gupta@college.com', 'Web Development', 9, 'BCA', '9823456781');
INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (9, 'Dr. Sunita Rao', 'sunita.rao@college.com', 'Operating Systems', 11, 'Computer Science', '9834567812');
INSERT INTO teachers (id, name, email, subject, experience_years, department, phone) VALUES (10, 'Prof. Deepak Joshi', 'deepak.joshi@college.com', 'Network Security', 13, 'Information Technology', '9845678123');
