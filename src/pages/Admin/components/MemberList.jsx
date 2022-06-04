import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";
import * as XLSX from "xlsx";

const MemberList = () => {
  //////////取得名單////////////
  const [Member, setMember] = useState([]);
  const [Test, setTest] = useState("");

  let MemberTemp = [];

  useEffect(() => {
    axios.get(process.env.REACT_APP_AXIOS_READ).then((response) => {
      MemberTemp = response.data;
      for (let i = 0; i < MemberTemp.length; i++) {
        MemberTemp[i].Password = "";
      }
      setMember(MemberTemp);
    });
  }, []);

  function StudentIdChange(e) {
    MemberTemp = Member;
    let FindId = e.target.id.split("_");
    MemberTemp[FindId[0]].StudentId = e.target.value;

    setMember(MemberTemp);
    setTest(e.target.value);
  }
  function PasswordChange(e) {
    MemberTemp = Member;
    let FindId = e.target.id.split("_");

    MemberTemp[FindId[0]].Password = e.target.value;

    setMember(MemberTemp);
    setTest(e.target.value);
  }
  function EmailChange(e) {
    MemberTemp = Member;
    let FindId = e.target.id.split("_");
    MemberTemp[FindId[0]].Email = e.target.value;

    setMember(MemberTemp);
    setTest(e.target.value);
  }
  function AccessChange(e) {
    MemberTemp = Member;
    let FindId = e.target.id.split("_");
    MemberTemp[FindId[0]].Access = e.target.value;

    setMember(MemberTemp);
    setTest(e.target.value);
  }
  const DownloadMember = () => {
    const worksheet = XLSX.utils.json_to_sheet(Member);
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook,worksheet,"All_Member");
    //Buffer
    let buffer = XLSX.write(workbook,{book_type:"xlsx",type:"buffer"})
    //Binary string
    XLSX.write(workbook,{book_type:"xlsx",type:"binary"})

    XLSX.writeFile(workbook,"StudentMember.xlsx")
  };
  const UploadMember = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      let SPdata = data.split("\n");

      let DataContainer = [];
      let DataUpdate = [];
      for(let i = 1; i < SPdata.length; i++) {
        DataContainer[i-1] = SPdata[i].split(",");
      }
      
      for(let i = 0;i <DataContainer.length; i++){
        const UploadData = {
        Name:DataContainer[i][1],
        StudentId:DataContainer[i][2],
        Password:DataContainer[i][3],
        Email:DataContainer[i][4],
        Access:DataContainer[i][5],
        };
        DataUpdate.push(UploadData);
      }
      axios.post(process.env.REACT_APP_AXIOS_ADMINUPLOAD,DataUpdate).then((response) => {
        if(response.data === 'success'){
          window.alert(response.data)
        }else{
          window.alert('failed');
        }
      })
    };
    reader.readAsBinaryString(file);
  };

  const EditStudent = (Id, key) => {
    if (window.confirm(`確定改${Id}？`)) {
      let KeyStudentId = key + "_StudentId";
      let KeyPassword = key + "_Password";
      let KeyEmail = key + "_Email";
      let KeyAccess = key + "_Access";

      const Edit = {
        Name: Member[key].Name,
        StudentId: document.getElementById(KeyStudentId).value,
        Password: document.getElementById(KeyPassword).value,
        Email: document.getElementById(KeyEmail).value,
        Access: document.getElementById(KeyAccess).value,
      };
      console.log(Edit);
      axios
        .post(process.env.REACT_APP_AXIOS_ADMINEDIT, Edit)
        .then((response) => {
          window.alert(response.data);
        });
    }
  };
  const DeleteStudent = (Id, key) => {
    if (window.confirm(`確定刪除${Id}?`)) {
      axios
        .post(process.env.REACT_APP_AXIOS_ADMINDELETED, {
          Name: Member[key].Name,
        })
        .then((response) => {
          window.alert(response.data);
        });
    }
  };
  ////////////////////////////////
  return (
    <div className="AdminMember">
      <h1 className="AdminTitle">成員名單</h1>
      <div className="memberBtn">
      <h4 id="memberuploadText">批量上傳學生（請先下載格式）</h4>
      <Button
        style={{width:'200px'}}
        variant="contained"
        color="success"
        onClick={() => {
          DownloadMember();
        }}
      >
        下載
      </Button>
          <input
            id="memberuploadBtn"
            type="file"
            className="form-control"
            onChange={UploadMember}
          />
      </div>
      <table className="memberTable" id="Member">
        <thead>
          <tr>
            <th className="AdminStandText">姓名</th>
            <th className="AdminStandText">學號</th>
            <th className="AdminStandText">密碼</th>
            <th className="AdminStandText">電子郵件</th>
            <th className="AdminStandText">權限</th>
            <th className="AdminStandText" colSpan={2}>
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {Member.map((val, key) => {
            return (
              <tr>
                <td className="memberTable_td">
                  <h3>{Member[key].Name}</h3>
                </td>
                <td className="memberTable_td">
                  <TextField
                    id={`${key}_StudentId`}
                    label={key}
                    variant="outlined"
                    value={Member[key].StudentId}
                    onChange={StudentIdChange}
                  />
                </td>
                <td className="memberTable_td">
                  <TextField
                    id={`${key}_Password`}
                    label={key}
                    variant="outlined"
                    value={Member[key].Password}
                    onChange={PasswordChange}
                  />
                </td>
                <td className="memberTable_td">
                  <TextField
                    id={`${key}_Email`}
                    label={key}
                    variant="outlined"
                    value={Member[key].Email}
                    onChange={EmailChange}
                  />
                </td>
                <td className="memberTable_td">
                  <TextField
                    id={`${key}_Access`}
                    label={key}
                    variant="outlined"
                    value={Member[key].Access}
                    onChange={AccessChange}
                  />
                </td>
                <td className="memberTable_td">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      DeleteStudent(val.StudentId, key);
                    }}
                  >
                    刪除
                  </Button>
                </td>
                <td className="memberTable_td" key={key}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      EditStudent(val.StudentId, key);
                    }}
                  >
                    修改
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
