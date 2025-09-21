import Teacher from "../models/teacher.js";

export const TeacherLogin = (req, res) => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  let teacherUsername = `teacher${randomNumber}`;
  let newTeacher = new Teacher({ username: teacherUsername });
  newTeacher.save();
  let username =newTeacher.username
  res.status(201).json({
    status: "success",
    username,
  });
};
