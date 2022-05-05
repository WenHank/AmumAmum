import React from "react";
import { Nav, Navbar, Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Tree from "./components/Treedocument";
import BST from "./components/BSTGame";
import AVL from "./components/AVLGame";
import RBT from "./components/RBTGame";
import Test from "../A2/components/Test";
import Robots from "./components/Robots";
import axios from "axios";

class A3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Container: <Home />,
      StudentId: "",
    };
    this.handle = this.handle.bind(this);
  }

  handle(Num) {
    this.setState({ Container: Num });
  }
  /*到此 */

  
  componentDidMount() {
    const GetSid = sessionStorage.getItem("Sid");

    if (GetSid !== null || GetSid !== "null") {
      axios({
        method: "POST",
        data: {
          _id: GetSid,
        },
        withCredentials: true,
        url: process.env.REACT_APP_AXIOS_USERINFO,
      }).then((response) => {
        this.setState({ StudentId: response.StudentId });
      });
    }

    const dfMessanger_bot = document.querySelector("df-messenger");
    //一般文字選擇
    dfMessanger_bot.addEventListener(
      "df-user-input-entered",
      this.MarkUserTalkWithRobot,
      false
    );
    //列表選擇
    dfMessanger_bot.addEventListener(
      "df-list-element-clicked",
      this.MarkUserTalkWithRobot,
      false
    );
    //chip選擇
    dfMessanger_bot.addEventListener(
      "df-chip-clicked",
      this.MarkUserTalkWithRobot,
      false
    );
    dfMessanger_bot.addEventListener(
      "onchange",
      this.MarkUserOpenRobot,
      false
    )
    //監聽點擊事件(A3 Header)
    const Header = document.querySelector("nav");
    Header.addEventListener("click", this.MarkUserClickWithHeader, false);
    //監聽點擊事件(A3 Container)
    const Container = document.getElementById("A3_Container");
    Container.addEventListener("click", this.MarkUserClickWithContainer, false);

    //上傳監聽事件
    //window.addEventListener("beforeunload", this.Uploading, false);
  }

  //記錄使用者行為///////////////////////////////////////////
  Uploading = (e) => {
    let PushToDB = JSON.parse(sessionStorage.getItem("UserInput"));
    axios
      .post(process.env.REACT_APP_AXIOS_USERINPUT, {
        StudentId: this.StudentId,
        Mark: PushToDB.Mark,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.removeItem("UserInput", null);
      });
    e.returnValue = "";
  };
  //A3 Robot////////////////////////////////////////////////
  MarkUserOpenRobot = (e) => {
    //提取使用者輸入內容
    const UserInput = sessionStorage.getItem("UserInput");
    //儲存時間
    const UserInputTime = new Date();
    //偵測點擊機器人
    let UserClickRobot = e.path[0].id;
    let RobotClick;
    console.log(e);
    console.log(UserClickRobot)
    //輸出暫存位置
    let UserOptString = null;
    //描述暫存
    let DescriptionTemp = "";
    //對話暫存紀錄
    let OptNode = {
      StudentId: "",
      Mark: {
        Saying: {
          Text: [],
          Time: [],
        },
        Clicking: {
          Text: [],
          Time: [],
        },
        Description: [],
      },
    };
    if(UserInput == null){
      //點擊事件
      if(UserClickRobot === "closeSvg" || UserClickRobot === 'widgetIcon'){
        RobotClick = "點擊機器人視窗"
        OptNode.Mark.Clicking.Text.push(RobotClick);
        OptNode.Mark.Clicking.Time.push(UserInputTime);
        //建立紀錄形容
        DescriptionTemp = "在 " + UserInputTime + RobotClick;
        OptNode.Mark.Description.push(DescriptionTemp);
        //建立第一次樣式
        UserOptString = OptNode;
      }
    } else {
      //JSON轉陣列
      let StorageUserInput = JSON.parse(UserInput);
      console.log("儲存資料",StorageUserInput)
      //點擊事件
      if(UserClickRobot === "closeSvg" || UserClickRobot === 'widgetIcon'){
        RobotClick = "點擊機器人視窗"
        StorageUserInput.Mark.Clicking.Text.push(RobotClick);
        StorageUserInput.Mark.Clicking.Time.push(UserInputTime);
        DescriptionTemp = "在 " + UserInputTime + RobotClick;
        StorageUserInput.Mark.Description.push(DescriptionTemp);
        UserOptString = StorageUserInput;
      }
    }
    if(UserClickRobot === "closeSvg" || UserClickRobot === "widgetIcon"){
      //轉字串後塞入sessionStorage
      UserOptString = JSON.stringify(UserOptString);
      //console.log("目前資料(字串)",UserOptString)
      sessionStorage.setItem("UserInput", UserOptString);
    }
  }
  MarkUserTalkWithRobot = (e) => {
    //使用者說話
    //console.log(e.detail.input);
    //list選擇
    //console.log(e.detail.element.title_);
    //chip選擇
    //console.log(e.detail.query);
    //使用者輸入型別
    let UserInputType;
    
    switch (e.type) {
      case "df-user-input-entered":
        UserInputType = e.detail.input;
        break;
      case "df-list-element-clicked":
        UserInputType = e.detail.element.title_;
        break;
      case "df-chip-clicked":
        UserInputType = e.detail.query;
        break;
    }

    //若選擇課程進行跳頁
    switch (UserInputType) {
      case "第一章:BST 二元搜尋樹":
        this.handle(<BST />);
        break;
      case "第二章:AVL 二元平衡樹":
        this.handle(<AVL />);
        break;
      case "第三章:RBT 紅黑樹":
        this.handle(<RBT />);
        break;
    }

    //提取使用者輸入內容
    const UserInput = sessionStorage.getItem("UserInput");
    //儲存時間
    const UserInputTime = new Date();

    //輸出暫存位置
    let UserOptString = null;
    //描述暫存
    let DescriptionTemp = "";
    //對話暫存紀錄
    let OptNode = {
      StudentId: "",
      Mark: {
        Saying: {
          Text: [],
          Time: [],
        },
        Clicking: {
          Text: [],
          Time: [],
        },
        Description: [],
      },
    };
    if (UserInput == null) {
      //尚未開始使用直接塞入
      sessionStorage.setItem("UserInput", null);
      //資料塞入預設Node
      OptNode.Mark.Saying.Text.push(UserInputType);
      OptNode.Mark.Saying.Time.push(UserInputTime);
      //建立紀錄形容
      DescriptionTemp = "在 " + UserInputTime + " 向機器人說 " + UserInputType;
      OptNode.Mark.Description.push(DescriptionTemp);
      //建立第一次樣式
      UserOptString = OptNode;
    } else {
      //JSON轉陣列
      let StorageUserInput = JSON.parse(UserInput);
      console.log("儲存資料",StorageUserInput)
      StorageUserInput.Mark.Saying.Text.push(UserInputType);
      StorageUserInput.Mark.Saying.Time.push(UserInputTime);
      DescriptionTemp = "在 " + UserInputTime + " 向機器人說 " + UserInputType;
      StorageUserInput.Mark.Description.push(DescriptionTemp);
      UserOptString = StorageUserInput;
    }
    //轉字串後塞入sessionStorage
    UserOptString = JSON.stringify(UserOptString);
    //console.log("目前資料(字串)",UserOptString)
    sessionStorage.setItem("UserInput", UserOptString);
  };
  ////////////////////////////////////////////////////////////////////////
  //A3 Header////////////////////////////////////////////////
  MarkUserClickWithHeader = (e) => {
    //取得點擊事件target 之 id
    //console.log(e.target.id); String
    let HeaderKey = parseInt(e.target.id);

    const HeaderTarget = new Map([
      [301, "A3_主頁面"],
      [302, "A3_樹的介紹"],
      [303, "A3_BST樹"],
      [304, "A3_AVL樹"],
      [305, "A3_RBT樹"],
      [306, "A3_測驗"],
      [307, "A3_回到Profile"],
    ]);
    //console.log("點擊了",HeaderTarget.get(HeaderKey))
    //儲存點擊物件
    const HeaderClick = HeaderTarget.get(HeaderKey);

    //提取使用者輸入內容
    const UserInput = sessionStorage.getItem("UserInput");

    //儲存時間
    const UserClickTime = new Date();

    //輸出暫存位置
    let UserOptString = null;
    //描述暫存
    let DescriptionTemp = "";
    //對話暫存紀錄
    let OptNode = {
      StudentId: "",
      Mark: {
        Saying: {
          Text: [],
          Time: [],
        },
        Clicking: {
          Text: [],
          Time: [],
        },
        Description: [],
      },
    };

    if (UserInput == null) {
      //尚未開始使用直接塞入
      sessionStorage.setItem("UserInput", null);
      //資料塞入預設Node
      OptNode.Mark.Clicking.Text.push(HeaderClick);
      OptNode.Mark.Clicking.Time.push(UserClickTime);
      //建立紀錄形容
      DescriptionTemp = "在" + UserClickTime + "點擊" + HeaderClick;
      OptNode.Mark.Description.push(DescriptionTemp);
      //建立第一次樣式
      UserOptString = OptNode;
    } else {
      //JSON轉陣列
      let StorageUserClick = JSON.parse(UserInput);
      //console.log("儲存資料", StorageUserClick);
      StorageUserClick.Mark.Clicking.Text.push(HeaderClick);
      StorageUserClick.Mark.Clicking.Time.push(UserClickTime);
      DescriptionTemp = "在 " + UserClickTime + " 點擊 " + HeaderClick;
      StorageUserClick.Mark.Description.push(DescriptionTemp);
      UserOptString = StorageUserClick;
    }
    //轉字串後塞入sessionStorage
    UserOptString = JSON.stringify(UserOptString);
    //console.log("目前資料(字串)",UserOptString)
    sessionStorage.setItem("UserInput", UserOptString);
  };
  ////////////////////////////////////////////////////////////////////////
  //A3 Container////////////////////////////////////////////////
  MarkUserClickWithContainer = (e) => {
    //console.log(e.target.id);
    let ContainerKey = e.target.id;
    let ContainerLocalName = e.target.localName;
    let ContainerClassName = e.target.className;

    //提取使用者輸入內容
    const UserInput = sessionStorage.getItem("UserInput");

    //儲存時間
    const UserClickTime = new Date();

    //輸出暫存位置
    let UserOptString = null;
    //描述暫存
    let DescriptionTemp = "";
    //對話暫存紀錄
    let OptNode = {
      StudentId: "",
      Mark: {
        Saying: {
          Text: [],
          Time: [],
        },
        Clicking: {
          Text: [],
          Time: [],
        },
        Description: [],
      },
    };
    //點擊物件
    const ContainerTarget = new Map([
      //Home
      ["A3_Container", "A3_背景"],
      ["A3_Title", "A3_背景"],
      ["A3_Title_Text", "A3_主畫面文字"],
      //PDF
      ["canvas", "A3_教學文件"],
      ["span", "A3_教學文件文字"],
      ["A3_PDF_PreviousPage", "A3_教學文件上一頁"],
      ["A3_PDF_NextPage", "A3_教學文件下一頁"],
      ["A3_PDF_Page", "A3教學文件頁碼"],
      //BST
      ["A3_BST_Hint", "A3_BST遊戲教學"],
      ["A3_BST_Random", "A3_BST隨機生成"],
      ["A3_BST_Submit", "A3_BST送出答案"],
      ["A3_BST_Record_show", "A3_BST關閉紀錄版"],
      ["A3_BST_Record_hide", "A3_BST打開紀錄版"],
      ["A3_BST_Inorder_Change", "A3_BST更換Inorder"],
      ["A3_BST_Inorder_Draggable", "A3_BST拖動Inorder排序"],
      ["A3_BST_Preorder_Change", "A3_BST更換Preorder"],
      ["A3_BST_Preorder_Draggable", "A3_BST拖動Preorder排序"],
      ["A3_BST_Postorder_Change", "A3_BST更換Postorder"],
      ["A3_BST_Postorder_Draggable", "A3_BST拖動Postorder排序"],
      //AVL
      ["A3_AVL_Hint", "A3_AVL遊戲教學"],
      ["A3_AVL_Submit", "A3_AVL送出答案"],
      ["A3_AVL_Record_show", "A3_AVL關閉紀錄版"],
      ["A3_AVL_Record_hide", "A3_AVL打開紀錄版"],
      ["css-fi7omt","A3_拖動AVL排序"],
      //

    ]);

    if (ContainerClassName === "css-fi7omt") {
      console.log(ContainerTarget.get(ContainerClassName));
    } else {
      if (ContainerTarget.get(ContainerKey) === undefined) {
        if (ContainerTarget.get(ContainerLocalName !== undefined)) {
          console.log(ContainerTarget.get(ContainerLocalName));
        }
      } else {
        console.log(ContainerTarget.get(ContainerKey));
      }
    }
  };
  ////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <div className="A3">
        <div>
          <Navbar expand="lg" variant="dark" sticky="top" className="Header">
            <Container>
              <div
                onClick={() => {
                  this.handle(<Home />);
                }}
                to="/A3/Home"
                style={{
                  textDecoration: "none",
                  marginRight: "20px",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                id="301"
              >
                D.S.V
              </div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Tree />);
                    }}
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    id="302"
                  >
                    Introduction
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<BST />);
                    }}
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    id="303"
                  >
                    Binary Search Tree
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<AVL />);
                    }}
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    id="304"
                  >
                    Adelson Velsky Landis Tree
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<RBT />);
                    }}
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                    id="305"
                  >
                    Red Black Tree
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Test />);
                    }}
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    id="306"
                  >
                    Test
                  </Button>
                </Nav>
              </Navbar.Collapse>
              <Nav className="logSystem">
                <Link
                  to="/Profile"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/ios/50/000000/user--v2.png"
                    id="307"
                    alt="Profile"
                  />
                </Link>
              </Nav>
            </Container>
          </Navbar>
          <div id="A3_Container">{this.state.Container}</div>
        </div>
        <Robots />
      </div>
    );
  }
}

export default A3;
