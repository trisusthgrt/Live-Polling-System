const Teacher = require("../models/teacher");

// Simple session validation middleware
const validateSession = (req, res, next) => {
  const username = req.headers['x-username'] || req.body.username || req.query.username;
  
  if (!username) {
    return res.status(401).json({ error: "No username provided" });
  }
  
  // For teachers, validate against database
  if (username.startsWith('teacher')) {
    Teacher.findOne({ username })
      .then(teacher => {
        if (!teacher) {
          return res.status(401).json({ error: "Invalid teacher session" });
        }
        req.user = teacher;
        next();
      })
      .catch(err => {
        console.error("Session validation error:", err);
        res.status(500).json({ error: "Session validation failed" });
      });
  } else {
    // For students, just validate format (could be enhanced with more validation)
    req.user = { username, role: 'student' };
    next();
  }
};

module.exports = { validateSession };

