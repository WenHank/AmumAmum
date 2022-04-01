const express = require("express");
const router = express.Router();
//引入Schema
const SignUpTemplateCopy = require("../models/SignUpMondels");

/////////////寫入資料庫///////////////////
router.post(process.env.ROUTER_SIGNUP, async (req, res) => {
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
/////////////登入///////////////////
router.post(process.env.ROUTER_LOGIN, async (req, res) => {
  SignUpTemplateCopy.find(
    {
      StudentId: req.body.StudentId,
    },
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    }
  );
});
/////////////Dialogflow///////////////////
router.post(process.env.ROUTER_DIALOGFLOW, async (req, res, next) => {
  console.log(req.body);
});
module.exports = router;
