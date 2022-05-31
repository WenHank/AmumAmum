"use strict";

var mongoose = require("mongoose");

var BstGradeTemplate = new mongoose.Schema({
  StudentId: {
    type: "string",
    required: true
  },
  Grades: {
    type: "object",
    required: true
  },
  Time: {
    type: "object",
    required: true
  }
});
module.exports = mongoose.model("BstGrade", BstGradeTemplate);