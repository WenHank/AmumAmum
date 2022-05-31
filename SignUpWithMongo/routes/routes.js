const express = require("express");
const router = express.Router();
const bcryptjs = require("bcrypt");
//引入Schema
const SignUpTemplateCopy = require("../models/SignUpModels");
const MarkUserTemplateCopy = require("../models/MarkUserModels");
const BstGradeTemplateCopy = require("../models/BstGradeModels");
const AvlGradeTemplateCopy = require("../models/AvlGradeModels");
const RbtGradeTemplateCopy = require("../models/RbtGradeModels");

/////////////寫入資料庫///////////////////
router.post(process.env.ROUTER_SIGNUP, async (req, res) => {
  SignUpTemplateCopy.findOne({ StudentId: req.body.StudentId }, (err, doc) => {
    if (err) throw err;
    if (doc) {
      res.send("has been registered");
    } else {
      /////////////Schema///////////////////
      const SignedUpUser = new SignUpTemplateCopy({
        Name: req.body.Name,
        StudentId: req.body.StudentId,
        Password: req.body.Password,
        Email: req.body.Email,
        Access: req.body.Access,
      });
      ////////////////////////////////
      SignedUpUser.save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
});
/////////////紀錄行為/////////////////
router.post(process.env.ROUTER_USERINPUT, async (req, res) => {
  ///////////Schema////////////////
  const MarkedUpUser = new MarkUserTemplateCopy({
    StudentId: req.body.StudentId,
    Mark: req.body.Mark,
  });
  ////////////////////////////////
  MarkedUpUser.save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
/////////////讀取///////////////////
router.get(process.env.ROUTER_READ, async (req, res) => {
  ////////////////////////////////
  SignUpTemplateCopy.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
  ////////////////////////////////
});
/////////////Dialogflow///////////////////
router.post(process.env.ROUTER_DIALOGFLOW, (req, res, next) => {
  console.log("使用者提問：", req.body.queryResult.queryText);
  console.log("回覆：", req.body.queryResult.fulfillmentText);
  console.log("使用Intents：", req.body.queryResult.intent.displayName);
  //Socket回傳給首頁////////////////////////////////
  //存入資料庫/////////////////////////////////////
});
/////////////檢查使用者(是否正確為使用者)////////////////////
router.post(process.env.ROUTER_CHECKUSER, async (req, res) => {
  SignUpTemplateCopy.findOne({ _id: req.body._id }, (err, result) => {
    if (err) throw err;
    if (result == null) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});
/////////////取得使用者（除密碼）/////////////////////////
router.post(process.env.ROUTER_USERINFO, async (req, res) => {
  SignUpTemplateCopy.findOne({ _id: req.body._id }, (err, result) => {
    if (err) throw err;
    const SendResponse = {
      _id: result._id,
      Name: result.Name,
      StudentId: result.StudentId,
      Email: result.Email,
      Access: result.Access,
      ////////////////////////////////////////////////////////////////
    };
    res.send(SendResponse);
  });
});
////////////////////修改密碼////////////////////
router.post(process.env.ROUTER_CHANGEPASSWORD, async (req, res) => {
  SignUpTemplateCopy.findOne({ _id: req.body._id }, (err, result) => {
    if (err) throw err;
    console.log(result);
    bcryptjs.compare(req.body.OldPassword, result.Password, (err, result) => {
      if (result === true) {
        SignUpTemplateCopy.updateOne(
          { _id: req.body._id },
          { Password: req.body.NewPassword },
          (err, result) => {
            if (err) throw err;
            res.send("success");
          }
        );
      } else {
        res.send("NotCompare");
      }
    });
  });
});
////////////////////修改郵件////////////////////
router.post(process.env.ROUTER_CHANGEEMAIL, async (req, res) => {
  SignUpTemplateCopy.updateOne(
    { _id: req.body._id },
    { Email: req.body.Email },
    (err, result) => {
      if (err) throw err;
      res.send("success");
    }
  );
});
////////////////////成績寫入資料庫---BST////////////////////
router.post(process.env.ROUTER_BSTGRADE, async (req, res) => {
  BstGradeTemplateCopy.find(
    { StudentId: req.body.StudentId },
    (err, result) => {
      if (err) throw err;
      ////////////////////////////////
      if (result.length > 0) {
        console.log("fuck1");
        console.log(result);
        let GradesArr = [];
        let TimesArr = [];
        for (let i = 0; i < result[0].Grades.length; i++) {
          console.log(result[0].Grades[i]);
          GradesArr[i] = result[0].Grades[i];
          TimesArr[i] = result[0].Time[i];
        }
        GradesArr[result[0].Grades.length] = req.body.Grades;
        TimesArr[result[0].Grades.length] = req.body.Time;
        console.log(GradesArr);
        console.log(TimesArr);
        BstGradeTemplateCopy.updateOne(
          { StudentId: req.body.StudentId },
          { Grades: GradesArr, Time: TimesArr },
          (err, result) => {
            if (err) throw err;
            res.send("success");
          }
        );
      } else {
        console.log("fuck2");
        /////////////Schema///////////////////
        let GradesArr = [];
        let TimesArr = [];
        GradesArr[0] = req.body.Grades;
        TimesArr[0] = req.body.Time;
        const BstGrade = new BstGradeTemplateCopy({
          StudentId: req.body.StudentId,
          Grades: GradesArr,
          Time: TimesArr,
        });
        ////////////////////////////////
        BstGrade.save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.send(err);
          });
      }
    }
  );
});
/////////////取得成績BST/////////////////////////
router.post(process.env.ROUTER_BSTGRADEINFO, async (req, res) => {
  BstGradeTemplateCopy.findOne(
    { StudentId: req.body.StudentId },
    (err, result) => {
      if (err) throw err;
      const SendResponse = {
        StudentId: result.StudentId,
        Grades: result.Grades,
        Time: result.Time,
        ////////////////////////////////////////////////////////////////
      };
      res.send(SendResponse);
    }
  );
});
////////////////////成績寫入資料庫---AVL////////////////////
router.post(process.env.ROUTER_AVLGRADE, async (req, res) => {
  AvlGradeTemplateCopy.findOne(
    { StudentId: req.body.StudentId },
    (err, result) => {
      if (err) throw err;
      if (result) {
        AvlGradeTemplateCopy.updateOne(
          { Grades: req.body.Grades },
          { Time: req.body.Time },
          (err, result) => {
            if (err) throw err;
            res.send("success");
          }
        );
      } else {
        /////////////Schema///////////////////
        const AvlGrade = new AvlGradeTemplateCopy({
          StudentId: req.body.StudentId,
          Grades: req.body.Grades,
          Time: req.body.Time,
        });
        ////////////////////////////////
        AvlGrade.save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.send(err);
          });
      }
    }
  );
});
////////////////////成績寫入資料庫---RBT////////////////////
router.post(process.env.ROUTER_RBTGRADE, async (req, res) => {
  RbtGradeTemplateCopy.findOne(
    { StudentId: req.body.StudentId },
    (err, result) => {
      if (err) throw err;
      if (result) {
        RbtGradeTemplateCopy.updateOne(
          { Grades: req.body.Grades },
          { Time: req.body.Time },
          (err, result) => {
            if (err) throw err;
            res.send("success");
          }
        );
      } else {
        /////////////Schema///////////////////
        const RbtGrade = new RbtGradeTemplateCopy({
          StudentId: req.body.StudentId,
          Grades: req.body.Grades,
          Time: req.body.Time,
        });
        ////////////////////////////////
        RbtGrade.save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.send(err);
          });
      }
    }
  );
});
module.exports = router;
