import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import bcryptjs from "bcryptjs";

const Signup = () => {
  ////////////////////////////////
  //Name
  const [Name, setName] = useState("");
  function NameChange(e) {
    setName(e.target.value);
  }
  //StudentId
  const [StudentId, setStudentId] = useState("");
  function StudentIdChange(e) {
    setStudentId(e.target.value);
  }
  //Email
  const [Email, setEmail] = useState("");
  function EmailChange(e) {
    setEmail(e.target.value);
  }
  //Password
  const [Password, setPassword] = useState("");
  function PasswordChange(e) {
    setPassword(e.target.value);
  }
  //Access
  const [Access, setAccess] = useState("");
  function AccessChange(e) {
    setAccess(e.target.value);
  }
  ////////////////////////////////

  async function AddStudent() {
    //////////hash//////////////
    let hashedPassword = "";
    await bcryptjs.hash(Password, 10).then(function (hash) {
      hashedPassword = hash;
    });
    /////////////////////////////
    //////////store///////////////
    const register = {
      Name: Name,
      StudentId: StudentId,
      Email: Email,
      Password: hashedPassword,
      Access: Access,
    };
    ////////////////////////////////
    //////////送出請求///////////////
    await axios
      .post(process.env.REACT_APP_AXIOS_SIGNUP, register)
      .then((response) => {
        if (response.data === "has been registered") {
          alert("該使用者已註冊過");
        } else {
          alert(
            "送出成功！" +
              "姓名:" +
              Name +
              "學號:" +
              StudentId +
              "\n教學模式:" +
              Access
          );
          setName("");
          setStudentId("");
          setEmail("");
          setPassword("");
          setAccess("");
        }
      });
    ////////////////////////////////
  }
  //////////////////////////////////
  return (
    <div className="AdminSignUp">
      <h1 className="AdminTitle">手動新增成員</h1>
      <form>
        <div className="AdminStand">
          <h3 className="AdminStandText">學生姓名</h3>
          <TextField
            id="Name"
            label="姓名"
            variant="filled"
            size="small"
            style={{
              width: 300,
            }}
            required={true}
            value={Name}
            onChange={NameChange}
          />
        </div>
        <div className="AdminStand">
          <h3 className="AdminStandText">學生學號</h3>
          <TextField
            id="StudentId"
            label="學號"
            variant="filled"
            size="small"
            style={{
              width: 300,
            }}
            required={true}
            value={StudentId}
            onChange={StudentIdChange}
          />
        </div>
        <div className="AdminStand">
          <h3 className="AdminStandText">學生信箱</h3>
          <TextField
            id="Email"
            label="Email"
            variant="filled"
            size="small"
            style={{
              width: 300,
            }}
            required={false}
            value={Email}
            onChange={EmailChange}
            type="email"
          />
        </div>
        <div className="AdminStand">
          <h3 className="AdminStandText">學生密碼</h3>
          <TextField
            id="Password"
            label="Password"
            variant="filled"
            size="small"
            style={{
              width: 300,
            }}
            required={true}
            value={Password}
            onChange={PasswordChange}
          />
        </div>
        <div className="AdminStand">
          <h3 className="AdminStandText">學生權限</h3>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-filled-label">權限</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={Access}
              onChange={AccessChange}
            >
              <MenuItem value={1}>傳統式學習</MenuItem>
              <MenuItem value={2}>互動式學習</MenuItem>
              <MenuItem value={3}>引導式學習</MenuItem>
              <MenuItem value={4}>管理員</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="AdminStand">
          <Button
            variant="contained"
            color="success"
            className="AdminSubmit"
            onClick={AddStudent}
          >
            送出
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
