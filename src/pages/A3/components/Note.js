import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import axios from "axios";

const Note = ({}) => {
  const GetSid = sessionStorage.getItem("Sid");

  let StudentId = "";
  //新增筆記內容State
  const [UserInputNote, setUserInputNote] = useState("");
  //所有筆記暫存
  //param[Note= 內容 param[Time]= 時間
  const [UserReadNote, setUserReadNote] = useState([]);
  const [Test, setTest] = useState("");

  useEffect(() => {
    GetStudentId();
  }, []);
  //上傳筆記
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

  //取得學號載入筆記
  async function GetStudentId() {
    if (GetSid !== null || GetSid !== "null") {
      await axios({
        method: "POST",
        data: {
          _id: GetSid,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_USERINFO,
      })
        .then((response) => {
          return response.data.StudentId;
        })
        .then((response) => {
          ReadNote(response);
        });
    }
  }
  //取得筆記function
  const ReadNote = (StudentId) => {
    axios({
      method: "POST",
      data: { StudentId: StudentId },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_NOTEREAD,
    }).then((response) => {
      setUserReadNote(response.data);
    });
  };
  //Draggable function
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(UserReadNote);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setUserReadNote(items);
  }
  //Draggable OnClick function
  const EditingNote = (key) => {
    console.log(key);
  };
  // //筆記修改內容State
  // function NoteChange(e, key) {
  //   let Temp = UserReadNote;
  //   Temp[key].Note = e.target.value;
  //   setUserReadNote(Temp);
  //   setTest(e.target.value);
  // }
  // //修改筆記
  // const UpdateNote = (key) => {
  //   let UpdateTemp = {
  //     StudentId: StudentId,
  //     Note: UserReadNote[key].Note,
  //     Key: key,
  //   };
  //   axios({
  //     method: "POST",
  //     data: UpdateTemp,
  //     withCredentials: true,
  //     url: process.env.REACT_APP_AXIOS_NOTEUPDATE,
  //   }).then((response) => {
  //     window.alert(response.data);
  //   });
  // };
  // //刪除筆記
  // const DeleteNote = (key) => {
  //   let DeleteTemp = {
  //     StudentId: StudentId,
  //     Key: key,
  //   };
  //   axios({
  //     method: "POST",
  //     data: DeleteTemp,
  //     withCredentials: true,
  //     url: process.env.REACT_APP_AXIOS_NOTEDELETE,
  //   }).then((response) => {
  //     window.alert(response.data);
  //   });
  // };
  return (
    <div className="Note_Container">
      <h1 className="Note_Title">Note</h1>
      <div className="Note_Button">
        <Button
          variant="contained"
          style={{ backgroundColor: "#494949", fontSize: "20px" }}
        >
          新增筆記
        </Button>
      </div>
      <div id="Note_Create" style={{ display: "none" }}>
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
      </div>
      <div className="Note_Box">
        <header className="Note_Header">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="Note_characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {UserReadNote.map(({ Note, Time }, index) => {
                    return (
                      <Draggable key={Note} draggableId={Note} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {Note.length <= 10 && <p>{Note}</p>}
                            {Note.length > 10 && <p>...</p>}
                            <Button
                              onClick={() => {
                                EditingNote(index);
                              }}
                            >
                              查看更多
                            </Button>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </header>
      </div>
    </div>
  );
};

export default Note;
