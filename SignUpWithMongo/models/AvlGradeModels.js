const mongoose = require("mongoose");

const AvlGradeTemplate = new mongoose.Schema({
  StudentId: {
    type: "string",
    required: true,
  },
  Grades: {
    type: "string",
    required: true,
  },
  Time: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("AvlGrade", AvlGradeTemplate);
