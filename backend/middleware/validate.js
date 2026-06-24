const { body, validationResult } = require("express-validator");

const validateStudent = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Provide a valid email address")
    .normalizeEmail(),
  body("age")
    .isInt({ min: 15, max: 60 })
    .withMessage("Age must be between 15 and 60"),
  body("phone")
    .isMobilePhone("en-IN")
    .withMessage("Phone must be a valid Indian mobile number"),
  body("course").trim().notEmpty().withMessage("Course is required").escape(),
  body("semester")
    .isInt({ min: 1, max: 8 })
    .withMessage("Semester must be between 1 and 8"),
  body("grade")
    .isIn(["A+", "A", "B+", "B", "C+", "C", "F"])
    .withMessage("Grade must be one of A+, A, B+, B, C+, C, F"),
  body("cgpa")
    .isFloat({ min: 0, max: 10 })
    .withMessage("CGPA must be between 0 and 10"),
  body("city").trim().notEmpty().withMessage("City is required").escape(),
  body("state").trim().notEmpty().withMessage("State is required").escape(),
  body("enrollment_date")
    .isISO8601()
    .withMessage("Enrollment date must be a valid YYYY-MM-DD date"),
  body("status")
    .isIn(["active", "inactive", "graduated", "dropped"])
    .withMessage("Status must be active, inactive, graduated, or dropped"),
];

const validateCourse = [
  body("course_name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Course name must be between 2 and 100 characters")
    .escape(),
  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required")
    .escape(),
  body("duration_years")
    .isInt({ min: 1, max: 5 })
    .withMessage("Duration years must be between 1 and 5"),
  body("total_seats")
    .isInt({ min: 5, max: 200 })
    .withMessage("Total seats must be between 5 and 200"),
  body("fee_per_year")
    .isFloat({ min: 0 })
    .withMessage("Fee per year must be positive"),
];

const validateTeacher = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Provide a valid email address")
    .normalizeEmail(),
  body("subject").trim().notEmpty().withMessage("Subject is required").escape(),
  body("experience_years")
    .isInt({ min: 0, max: 50 })
    .withMessage("Experience years must be between 0 and 50"),
  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required")
    .escape(),
  body("phone")
    .isMobilePhone("en-IN")
    .withMessage("Phone must be a valid Indian mobile number"),
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors
        .array()
        .map((err) => ({ field: err.path, message: err.msg })),
    });
  }
  next();
};

module.exports = {
  validateStudent,
  validateCourse,
  validateTeacher,
  checkValidation,
};
