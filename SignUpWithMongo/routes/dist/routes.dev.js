"use strict";

var express = require("express");

var router = express.Router();

var bcryptjs = require("bcrypt"); //引入Schema


var SignUpTemplateCopy = require("../models/SignUpModels");

var MarkUserTemplateCopy = require("../models/MarkUserModels");

var BstGradeTemplateCopy = require("../models/BstGradeModels");

var AvlGradeTemplateCopy = require("../models/AvlGradeModels");

var RbtGradeTemplateCopy = require("../models/RbtGradeModels"); /////////////寫入資料庫///////////////////


router.post(process.env.ROUTER_SIGNUP, function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          SignUpTemplateCopy.findOne({
            StudentId: req.body.StudentId
          }, function (err, doc) {
            if (err) throw err;

            if (doc) {
              res.send("has been registered");
            } else {
              /////////////Schema///////////////////
              var SignedUpUser = new SignUpTemplateCopy({
                Name: req.body.Name,
                StudentId: req.body.StudentId,
                Password: req.body.Password,
                Email: req.body.Email,
                Access: req.body.Access
              }); ////////////////////////////////

              SignedUpUser.save().then(function (data) {
                res.send(data);
              })["catch"](function (err) {
                res.send(err);
              });
            }
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}); /////////////紀錄行為/////////////////

router.post(process.env.ROUTER_USERINPUT, function _callee2(req, res) {
  var MarkedUpUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ///////////Schema////////////////
          MarkedUpUser = new MarkUserTemplateCopy({
            StudentId: req.body.StudentId,
            Mark: req.body.Mark
          }); ////////////////////////////////

          MarkedUpUser.save().then(function (data) {
            res.json(data);
          })["catch"](function (err) {
            res.json(err);
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}); /////////////讀取///////////////////

router.get(process.env.ROUTER_READ, function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ////////////////////////////////
          SignUpTemplateCopy.find({}, function (err, result) {
            if (err) {
              res.send(err);
            }

            res.send(result);
          }); ////////////////////////////////

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}); /////////////Dialogflow///////////////////

router.post(process.env.ROUTER_DIALOGFLOW, function (req, res, next) {
  console.log("使用者提問：", req.body.queryResult.queryText);
  console.log("回覆：", req.body.queryResult.fulfillmentText);
  console.log("使用Intents：", req.body.queryResult.intent.displayName); //Socket回傳給首頁////////////////////////////////
  //存入資料庫/////////////////////////////////////
}); /////////////檢查使用者(是否正確為使用者)////////////////////

router.post(process.env.ROUTER_CHECKUSER, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          SignUpTemplateCopy.findOne({
            _id: req.body._id
          }, function (err, result) {
            if (err) throw err;

            if (result == null) {
              res.send(false);
            } else {
              res.send(true);
            }
          });

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}); /////////////取得使用者（除密碼）/////////////////////////

router.post(process.env.ROUTER_USERINFO, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          SignUpTemplateCopy.findOne({
            _id: req.body._id
          }, function (err, result) {
            if (err) throw err;
            var SendResponse = {
              _id: result._id,
              Name: result.Name,
              StudentId: result.StudentId,
              Email: result.Email,
              Access: result.Access ////////////////////////////////////////////////////////////////

            };
            res.send(SendResponse);
          });

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}); ////////////////////修改密碼////////////////////

router.post(process.env.ROUTER_CHANGEPASSWORD, function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          SignUpTemplateCopy.findOne({
            _id: req.body._id
          }, function (err, result) {
            if (err) throw err;
            console.log(result);
            bcryptjs.compare(req.body.OldPassword, result.Password, function (err, result) {
              if (result === true) {
                SignUpTemplateCopy.updateOne({
                  _id: req.body._id
                }, {
                  Password: req.body.NewPassword
                }, function (err, result) {
                  if (err) throw err;
                  res.send("success");
                });
              } else {
                res.send("NotCompare");
              }
            });
          });

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}); ////////////////////修改郵件////////////////////

router.post(process.env.ROUTER_CHANGEEMAIL, function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          SignUpTemplateCopy.updateOne({
            _id: req.body._id
          }, {
            Email: req.body.Email
          }, function (err, result) {
            if (err) throw err;
            res.send("success");
          });

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}); ////////////////////成績寫入資料庫---BST////////////////////

router.post(process.env.ROUTER_BSTGRADE, function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          BstGradeTemplateCopy.find({
            StudentId: req.body.StudentId
          }, function (err, result) {
            if (err) throw err;

            if (result) {
              BstGradeTemplateCopy.insert({
                StudentId: req.body.StudentId,
                Grades: req.body.Grades,
                Time: req.body.Time
              });
            } else {
              /////////////Schema///////////////////
              var BstGrade = new BstGradeTemplateCopy({
                StudentId: req.body.StudentId,
                Grades: req.body.Grades,
                Time: req.body.Time
              }); ////////////////////////////////

              BstGrade.save().then(function (data) {
                res.send(data);
              })["catch"](function (err) {
                res.send(err);
              });
            }
          });

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
}); ////////////////////成績寫入資料庫---AVL////////////////////

router.post(process.env.ROUTER_AVLGRADE, function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          AvlGradeTemplateCopy.findOne({
            StudentId: req.body.StudentId
          }, function (err, result) {
            if (err) throw err;

            if (result) {
              AvlGradeTemplateCopy.updateOne({
                Grades: req.body.Grades
              }, {
                Time: req.body.Time
              }, function (err, result) {
                if (err) throw err;
                res.send("success");
              });
            } else {
              /////////////Schema///////////////////
              var AvlGrade = new AvlGradeTemplateCopy({
                StudentId: req.body.StudentId,
                Grades: req.body.Grades,
                Time: req.body.Time
              }); ////////////////////////////////

              AvlGrade.save().then(function (data) {
                res.send(data);
              })["catch"](function (err) {
                res.send(err);
              });
            }
          });

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
}); ////////////////////成績寫入資料庫---RBT////////////////////

router.post(process.env.ROUTER_RBTGRADE, function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          RbtGradeTemplateCopy.findOne({
            StudentId: req.body.StudentId
          }, function (err, result) {
            if (err) throw err;

            if (result) {
              RbtGradeTemplateCopy.updateOne({
                Grades: req.body.Grades
              }, {
                Time: req.body.Time
              }, function (err, result) {
                if (err) throw err;
                res.send("success");
              });
            } else {
              /////////////Schema///////////////////
              var RbtGrade = new RbtGradeTemplateCopy({
                StudentId: req.body.StudentId,
                Grades: req.body.Grades,
                Time: req.body.Time
              }); ////////////////////////////////

              RbtGrade.save().then(function (data) {
                res.send(data);
              })["catch"](function (err) {
                res.send(err);
              });
            }
          });

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
});
module.exports = router;