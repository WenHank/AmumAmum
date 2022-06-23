import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Note = () => {
  const GetSid = sessionStorage.getItem("Sid");
  const [StudentId, setStudentId] = useState("");
  const [NotePage, setNotePage] = useState("Create");

  const [UserInputNote, setUserInputNote] = useState("");
  const [UserReadNote, setUserReadNote] = useState([]);
  const [Test, setTest] = useState("");

  const SubmitNote = () => {
    const NoteUpdate = {
      StudentId: StudentId,
      Note: UserInputNote,
    };
    console.log(NoteUpdate);
    axios({
      method: "POST",
      data: NoteUpdate,
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_NOTECREATE,
    }).then((res) => {
      window.alert(res.data);
    });
  };

  const ReadNote = () => {
    axios({
      method: "POST",
      data: { StudentId: StudentId },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_NOTEREAD,
    }).then((response) => {
      setUserReadNote(response.data);
    });
  };
  function NoteChange(e, key) {
    let Temp = UserReadNote;
    Temp[key].Note = e.target.value;
    setUserReadNote(Temp);
    setTest(e.target.value);
  }

  const UpdateNote = (key) => {
    let UpdateTemp = {
      StudentId: StudentId,
      Note: UserReadNote[key].Note,
      Key: key,
    };
    axios({
      method: "POST",
      data: UpdateTemp,
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_NOTEUPDATE,
    }).then((response) => {
      window.alert(response.data);
    });
  };

  const DeleteNote = (key) => {
    let DeleteTemp = {
      StudentId: StudentId,
      Key: key,
    };
    axios({
      method: "POST",
      data: DeleteTemp,
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_NOTEDELETE,
    }).then((response) => {
      window.alert(response.data);
    });
  };
  if (GetSid !== null || GetSid !== "null") {
    axios({
      method: "POST",
      data: {
        _id: GetSid,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_USERINFO,
    }).then((response) => {
      setStudentId(response.data.StudentId);
    });
  }
  return (
    <div className="Note_Container">
      <h1 className="Note_Title">Note</h1>
      <div className="Note_Button">
        <Button
          variant="contained"
          style={{ backgroundColor: "#494949", fontSize: "20px" }}
          onClick={() => {
            setNotePage("Create");
          }}
        >
          做筆記
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#949494", fontSize: "20px" }}
          onClick={() => {
            setNotePage("Search");
            ReadNote();
          }}
        >
          看筆記
        </Button>
      </div>
      {NotePage === "Create" && (
        <>
          <h3 className="Note_Title">筆記填寫</h3>
          <div className="Note_Box">
            <TextField
              id="CreateNote"
              label="寫下你的筆記"
              multiline
              rows={5}
              style={{ width: "30%" }}
              placeholder="開始吧！"
              value={UserInputNote}
              onChange={(e) => {
                setUserInputNote(e.target.value);
              }}
            />
            <div className="Note_CreateBtn">
              <Button
                variant="outlined"
                style={{
                  marginRight: "5px",
                  fontSize: "20px",
                }}
                onClick={() => {
                  SubmitNote();
                }}
              >
                送出筆記
              </Button>
              <Button
                variant="outlined"
                style={{
                  color: "red",
                  marginLeft: "5px",
                  fontSize: "20px",
                }}
                onClick={() => {
                  setUserInputNote("");
                }}
              >
                清除筆記
              </Button>
            </div>
          </div>
        </>
      )}
      {NotePage === "Search" && (
        <div className="Note_Box">
          <h3>筆記記錄</h3>
          <table className="Note_ShowTable">
            <thead>
              <tr>
                <th className="Note_ShowTable_th">條目</th>
                <th className="Note_ShowTable_th">筆記內容</th>
                <th className="Note_ShowTable_th">最後修改時間</th>
                <th className="Note_ShowTable_th" colSpan="2">
                  功能
                </th>
              </tr>
            </thead>
            <tbody>
              {UserReadNote.map((val, key) => {
                return (
                  <tr>
                    <td className="Note_ShowTable_td">條目{key}</td>
                    <td className="Note_ShowTable_td">
                      <TextField
                        label={`條目${key}`}
                        multiline
                        rows={5}
                        value={UserReadNote[key].Note}
                        onChange={(e) => {
                          NoteChange(e, key);
                        }}
                      />
                    </td>
                    <td className="Note_ShowTable_td">
                      {UserReadNote[key].Time}
                    </td>
                    <td className="NOte_ShowTable_td">
                      <Button
                        variant="contained"
                        onClick={() => {
                          UpdateNote(key);
                        }}
                      >
                        更改
                      </Button>
                    </td>
                    <td className="NOte_ShowTable_td">
                      <Button
                        variant="contained"
                        onClick={() => {
                          DeleteNote(key);
                        }}
                      >
                        刪除
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Note;
