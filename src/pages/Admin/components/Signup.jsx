import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import bcryptjs from "bcryptjs";
import { useNavigate } from "react-router-dom";

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
  const Refresh = useNavigate("");
  return (
    <div className="AdminSignUp">
      <h1 className="AdminTitle">手動新增成員</h1>
      <img
        onClick={() => {
          Refresh("/Profile");
        }}
        style={{
          position: "absolute",
          left: "100px",
          top: "20px",
          cursor: "pointer",
        }}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEs0lEQVR4nO2ba4hVVRTHf86MzuiUlaM9dCqmPlhCWVKJpB/ELDCH/GC+SFPCID9kGSiFhUREUNEDKqihJ/gheqE9hDRSYghTrBhMG3wxPbFEZrJxbOz2Ye3D2nvunTv3nHvO3nPp/uBy556791r/ve8+e6+19xmoUqVKlTCMBJYDnwHtwONAQ1BFnmgE7geOArkBry+BmnDSsqUJeAw4jtvoX4DvrM/zQgnMikuB54Ae3Ib/CKwG6oEJ1vUHw8hMn6uBN4A+3IbvARbiDvV51vd3+JWZPtcDbwP9uA3/CmgFRhSo86opcxo414/M9JkJbMVt9FlzbXqRejXAr6b81ow1pk4N8qvuxm14HzIKrirBxkyr3j3ZyEyfemAFcAC34T3AC0BzDFtPo6Pl4nRlZsNq4Dfchv8OPAKcn8Bep7GxKy2BWbIet+GHgDXA6IT2JuOuDqXcMsG4ADiFiP0JWArUlWmzGTc+OAO8CIwr024m3IYKbU3RbgvwDjIHRPb/BJal6CMVbkEFLsjA/jXkL6NvMozigkagGxG2I0M/d+LmC51I5wwLoiUrB8zI0M+FwIeWr25gbob+SmYSGtu/78HfWnRuOA0s8uBzSNrQwMXHsrUE6DU++5FEKiiT0V+lzZPPWcBfxmev+RyU99CYf5Inn7eit98JYIonvwW5EZ2gnvHodwGaZncC53j0ncd2dIb2GbltRDv/JY9+85hrCdno0W8NEofkgH+B+R5957EXzQbHePTbDPxhfB9F0vNE1JYp5CQSuTUiKfLuMu2VSrd5zUdS8BPA1558O9Qiu7s54AjFs8OlQBey/9eSgu86YL/xfRw4LwWbibgXnQvuGqRMHdJ4O+1tAy4p03erZXNDmbYSUw/8bER8T+Fd30XknwLlkOBmE+UdiXUYWwcH8e2FDWijbi/w/U50qN4EfIzbEfuBGxL6fsCyEyxCHItMiIX29qaiAp+yrs9G7+Ec8A8yGuLuMjWhucJrcYWnyZNoY262rkfJUz9w+YA6o5AYwj492gGMj+k7GlGHYqtOkYvQX2KLudYE/G2ufVCk7jTgB7QTDgPXxvBtb9b6yk0K8jIaoS0GXkGFzR6i7hhgs1X+JKVvusyw6i2JrTpFWtBRYL/aKW2GHgE8inRglGeUMrGNRJbWHPBEbNUpsxh3q7sDuCKmjVXonkMPcF0JdY6Z8q/H9JUJ45Bd5FkkD7dXop1wDNknLEa7Kbstob9hyTp0JO2ieGd+Ycrt9KDLK2+hnbC2SLnPTZntPkT5pAEJc6NJcbCT5z2mzKeedHllDjoKBpvkuob4vuKJNmJ7yY8Ux6JLZ6yssJKeyXvevDeQ/yTJVDTOOOhNUQC+RX7lvQOub0IPayb4FuWT6GyyH/dplGhv8pu4BivpFgBtYC3yHCLIyfE08/cncQ1WWgfY93e0HK4x72eRBzNjUWkdYOsdhaS+d5vPHyEhc2KDlYC9W9SHZH6jkfv/2SCKPLMCDYgeQtf+zSFF+SR6pjiHPqt4CrgspChf1FH4nyzuCynKJ8vIb/y7QRV5Zh9u4zuQHOB/wXTcxh8GJgZV5Bn7kfou4MqwcsKwEngYOWuoUqVKlVT4D0pjfHbbAVIsAAAAAElFTkSuQmCC"
      />
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
