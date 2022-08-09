import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Treedocument from "../A1/components/Treedocument";
import BSTGame from "./components/BSTGame";
import AVLGame from "./components/AVLGame";
import RBTGame from "./components/RBTGame";
import Robots from "./components/Robots";
import Grade from "../Grade/components/Grade";
import axios from "axios";
import Note from "./components/Note";

//Google表癲link
let testWIDTH = "640";
if (window.screen.width < 450) {
  testWIDTH = "350";
}
function BSTTEST(params) {
  return (
    <div className="testContainer">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfQiQz29af9rDxC0XJw65MTlgGa0ARVTRVYK8L6I95IQZv8Hw/viewform?embedded=true"
        width={testWIDTH}
        height="4556"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        載入中…
      </iframe>
    </div>
  );
}
function AVLTEST(params) {
  return (
    <div className="testContainer">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeOS0jLLO6VG-Gb9XUJ73rMhr8qBBk5DoCj3XmdSJVxbWA1Yw/viewform?embedded=true"
        width={testWIDTH}
        height="4556"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        載入中…
      </iframe>
    </div>
  );
}
function RBTTEST(params) {
  return (
    <div className="testContainer">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSd6BogVec0_Fnkit5c-oZOiTzXn8e7480LzbM-cdezgeOMi8g/viewform?embedded=true"
        width={testWIDTH}
        height="4556"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        載入中…
      </iframe>
    </div>
  );
}
function MIXEDTEST(params) {
  return (
    <div className="testContainer">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSd6e6BWDc7ePfG_5hgO3SzLOq6at3_WawwnGlIjkQdQgu9rtg/viewform?embedded=true"
        width={testWIDTH}
        height="4556"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        載入中…
      </iframe>
    </div>
  );
}

class A3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Container: <Home />,
      StudentId: "",
      slidebarOC: "slideHeader",
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
    // //監聽點擊事件(A3 Header)
    // const Header = document.querySelector("nav");
    // Header.addEventListener("click", this.MarkUserClickWithHeader, false);
    // //監聽點擊事件(A3 Container)
    // const Container = document.getElementById("A3_Container");
    // Container.addEventListener("click", this.MarkUserClickWithContainer, false);
    document.addEventListener("click", this.MarkUserClickWithContainer, false);
    //上傳監聽事件
    //window.addEventListener("beforeunload", this.Uploading, false);
  }
  //記錄使用者行為///////////////////////////////////////////
  // Uploading = (e) => {
  //   let PushToDB = JSON.parse(sessionStorage.getItem("UserInput"));
  //   axios
  //     .post(process.env.REACT_APP_AXIOS_USERINPUT, {
  //       StudentId: this.StudentId,
  //       Mark: PushToDB.Mark,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       sessionStorage.removeItem("UserInput");
  //     });
  // };
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
      default:
        break;
    }

    //若選擇課程進行跳頁
    switch (UserInputType) {
      case "第一章:BST 二元搜尋樹":
        this.handle(<BSTGame />);
        break;
      case "第二章:AVL 二元平衡樹":
        this.handle(<AVLGame />);
        break;
      case "第三章:RBT 紅黑樹":
        this.handle(<RBTGame />);
        break;
      case "從網頁修改筆記":
        this.handle(<Note />);
        break;
      default:
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
      StudentId: this.StudentId,
      Mark: {
        Saying: {
          Text: [],
          Time: [],
        },
        Clicking: {
          Text: [],
          Time: [],
        },
        Operating: {
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
      //console.log("儲存資料", StorageUserInput);
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
  //A3 Container////////////////////////////////////////////////
  MarkUserClickWithContainer = (e) => {
    //console.log(e.target.id);
    let ContainerKey = e.target.id;
    //let ContainerClassName = e.target.className;
    console.log(e.target);
    //提取使用者輸入內容
    let UserInput = JSON.parse(sessionStorage.getItem("UserInput"));
    //儲存時間
    const UserClickTime = new Date();

    //描述暫存
    let DescriptionTemp = "";
    //對話暫存紀錄
    let OptNode = {
      Mark: {
        Saying: {
          Text: [],
          Time: [],
        },
        Clicking: {
          Text: [],
          Time: [],
        },
        Operating: {
          Text: [],
          Time: [],
        },
        Description: [],
      },
    };
    if (UserInput === null) {
      sessionStorage.setItem("UserInput", JSON.stringify(OptNode));
      UserInput = OptNode;
    }
    //點擊物件
    const ContainerTarget = new Map([
      //Home
      ["A3_Home", "A3_到主頁面"],
      ["A3_Intro", "A3_到教學文件頁面"],
      ["A3_BST", "A3_到BST頁面"],
      ["A3_AVL", "A3_到AVL頁面"],
      ["A3_RBT", "A3_到RBT頁面"],
      ["A3_Test_BST", "A3_到BST測驗頁面"],
      ["A3_Test_AVL", "A3_到AVL測驗頁面"],
      ["A3_Test_RBT", "A3_到RBT測驗頁面"],
      ["A3_Test_Mixed", "A3_到混合測驗頁面"],
      ["A3_Grade", "A3_到成績頁面"],
      ["A3_Note", "A3_到筆記頁面"],
      ["A3_Profile", "A3_回到個人檔案頁面"],
      //BST
      ["A3_BST_GameDifficulty_4", "A3_BST遊戲難度設定簡單"],
      ["A3_BST_GameDifficulty_6", "A3_BST遊戲難度設定普通"],
      ["A3_BST_GameDifficulty_8", "A3_BST遊戲難度設定困難"],
      ["A3_BST_Game_Restart", "A3_BST遊戲重新開始"],
      ["A3_BST_Gamerule", "A3_BST遊戲規則"],
      ["A3_BST_Hint", "A3_BST教學"],
      ["A3_BST_Game_Start", "A3_BST遊戲開始"],
      //AVL
      ["A3_AVL_GameDifficulty_4", "A3_AVL遊戲難度設定簡單"],
      ["A3_AVL_GameDifficulty_6", "A3_AVL遊戲難度設定普通"],
      ["A3_AVL_GameDifficulty_8", "A3_AVL遊戲難度設定困難"],
      ["A3_AVL_Game_Restart", "A3_AVL遊戲重新開始"],
      ["A3_AVL_Gamerule", "A3_AVL遊戲規則"],
      ["A3_AVL_Hint", "A3_AVL教學"],
      ["A3_AVL_Game_Start", "A3_AVL遊戲開始"],
      //RBT
      ["A3_RBT_GameDifficulty_4", "A3_RBT遊戲難度設定簡單"],
      ["A3_RBT_GameDifficulty_6", "A3_RBT遊戲難度設定普通"],
      ["A3_RBT_GameDifficulty_8", "A3_RBT遊戲難度設定困難"],
      ["A3_RBT_Game_Restart", "A3_RBT遊戲重新開始"],
      ["A3_RBT_Gamerule", "A3_RBT遊戲規則"],
      ["A3_RBT_Hint", "A3_RBT教學"],
      ["A3_RBT_Game_Start", "A3_RBT遊戲開始"],
      //Note
      ["A3_Note_Classify_Question", "A3_問題提問頁面"],
    ]);

    //儲存抓到的名稱
    let UserClick = ContainerTarget.get(ContainerKey);

    if (ContainerKey !== "") {
      if (UserClick !== undefined) {
        //點擊動作、時間儲存
        UserInput.Mark.Clicking.Text.push(UserClick);
        UserInput.Mark.Clicking.Time.push(UserClickTime);
        //描述儲存
        DescriptionTemp = "在 " + UserClickTime + " 點擊 " + UserClick;
        UserInput.Mark.Description.push(DescriptionTemp);
      } else {
        //遊戲選項 AVL_Game_Insert3
        let Option = ContainerKey.split("_");
        if (Option[1] === "Game") {
          let OptionInput = Option[0] + "遊戲選項 " + Option[3];
          UserInput.Mark.Operating.Text.push(OptionInput);
          UserInput.Mark.Operating.Time.push(UserClickTime);
          //描述儲存
          DescriptionTemp = "在 " + UserClickTime + " 操作 " + OptionInput;
          UserInput.Mark.Description.push(DescriptionTemp);
        }

        //Note分類 / 小分類 選項 A3_Note_Classify_Click_${Name}
        if (Option[2] === "Classify" || Option[2] === "SubClassify") {
          let OptionInput = Option[1] + "分類 " + Option[4];
          OptionInput =
            Option[2] === "Classify"
              ? Option[1] + "分類 " + Option[4]
              : Option[1] + "小分類 " + Option[4];
          switch (Option[3]) {
            //點擊分類
            case "Click":
              UserInput.Mark.Clicking.Text.push(OptionInput);
              UserInput.Mark.Clicking.Time.push(UserClickTime);
              //描述儲存
              DescriptionTemp = "在 " + UserClickTime + "點擊 " + OptionInput;
              UserInput.Mark.Description.push(DescriptionTemp);
              break;
            //編輯分類
            case "Edit":
              UserInput.Mark.Operating.Text.push(OptionInput);
              UserInput.Mark.Operating.Time.push(UserClickTime);
              //描述儲存
              DescriptionTemp = "在 " + UserClickTime + "編輯 " + OptionInput;
              UserInput.Mark.Description.push(DescriptionTemp);
              break;
            //取消編輯分類
            case "CancelEdit":
              UserInput.Mark.Operating.Text.push(OptionInput);
              UserInput.Mark.Operating.Time.push(UserClickTime);
              //描述儲存
              DescriptionTemp =
                "在 " + UserClickTime + "取消編輯 " + OptionInput;
              UserInput.Mark.Description.push(DescriptionTemp);
              break;
            //刪除分類
            case "Delete":
              UserInput.Mark.Operating.Text.push(OptionInput);
              UserInput.Mark.Operating.Time.push(UserClickTime);
              //描述儲存
              DescriptionTemp = "在 " + UserClickTime + "刪除 " + OptionInput;
              UserInput.Mark.Description.push(DescriptionTemp);
              break;
            //新增分類
            case "Create":
              UserInput.Mark.Operating.Text.push(OptionInput);
              UserInput.Mark.Operating.Time.push(UserClickTime);
              //描述儲存
              DescriptionTemp = "在 " + UserClickTime + "新增 " + OptionInput;
              UserInput.Mark.Description.push(DescriptionTemp);
              break;
          }
        }
      }
      //儲存完畢 上傳session
      console.table(UserInput.Mark.Description);
      sessionStorage.setItem("UserInput", JSON.stringify(UserInput));
    }
  };
  ////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="A3">
        <div>
          <label>
            <input type="checkbox" className="sidebarinput" />
            <div className="toggleHeader">
              <div className="triangleHeader"></div>
              <div className="setting">
                <img
                  onClick={() => {
                    if (this.state.slidebarOC === "slideHeader slideHeaderO") {
                      this.setState({ slidebarOC: "slideHeader" });
                    } else {
                      this.setState({ slidebarOC: "slideHeader slideHeaderO" });
                    }
                  }}
                  className="settingIcon"
                  src="data:image/png;base64,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"
                />
              </div>
            </div>
            <div className={this.state.slidebarOC}>
              <div
                className="block"
                style={{ marginTop: "150px", width: "100%" }}
              >
                <div className="columnCss" style={{ width: "100%" }}>
                  <h4 className="catablock">Index</h4>
                  <Button
                    className="cataItem"
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Home />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                    to="/A3/Home"
                    id="301"
                  >
                    Index
                  </Button>
                </div>
                <div className="columnCss" style={{ width: "100%" }}>
                  <h4 className="catablock">Introduction</h4>
                  <Button
                    className="cataItem"
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Treedocument />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                    id="302"
                  >
                    <input type="checkbox" className="cataItem" />
                    Introduction
                  </Button>
                </div>
                <div className="columnCss" style={{ width: "100%" }}>
                  <h4 className="catablock">BST</h4>
                  <Button
                    className="cataItem"
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<BSTGame />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                  >
                    BSTGame
                  </Button>
                </div>
                <div className="columnCss" style={{ width: "100%" }}>
                  <h4 className="catablock">AVL</h4>
                  <Button
                    className="cataItem"
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<AVLGame />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                  >
                    AVLGame
                  </Button>
                </div>
                <div className="columnCss" style={{ width: "100%" }}>
                  <h4 className="catablock">RBT</h4>
                  <Button
                    className="cataItem"
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<RBTGame />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                  >
                    RBTGame
                  </Button>
                </div>
                <div className="columnCss" style={{ width: "100%" }}>
                  <h4 className="catablock">Grade</h4>
                  <Button
                    className="cataItem"
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Grade />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                    id="305"
                  >
                    Grade
                  </Button>
                </div>
                <div className="columnCss" style={{ width: "100%" }}>
                  <h4 className="catablock">Test</h4>
                  <Button
                    className="cataItem"
                    variant="outline-dark"
                    id="A3_Test"
                    onClick={() => {
                      this.handle(<BSTTEST />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                  >
                    BST Test
                  </Button>
                  <Button
                    className="cataItem"
                    onClick={() => {
                      this.handle(<AVLTEST />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                    variant="outline-dark"
                    id="A3_Test"
                  >
                    AVL Test
                  </Button>
                  <Button
                    className="cataItem"
                    onClick={() => {
                      this.handle(<RBTTEST />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                    variant="outline-dark"
                    id="A3_Test"
                  >
                    RBT Test
                  </Button>
                  <Button
                    className="cataItem"
                    onClick={() => {
                      this.handle(<MIXEDTEST />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                    variant="outline-dark"
                    id="A3_Test"
                  >
                    Mixed Test
                  </Button>
                </div>
                <div className="columnCss" style={{ width: "100%" }}>
                  <h4 className="catablock">Note</h4>
                  <Button
                    className="cataItem"
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Note />);
                      if (
                        this.state.slidebarOC === "slideHeader slideHeaderO"
                      ) {
                        this.setState({ slidebarOC: "slideHeader" });
                      } else {
                        this.setState({
                          slidebarOC: "slideHeader slideHeaderO",
                        });
                      }
                    }}
                    id="A3_Note"
                  >
                    Note
                  </Button>
                </div>
              </div>
            </div>
          </label>
          <div className="rowCss SraechProfile">
            <Link
              className="cataItem"
              to="/Profile"
              style={{
                textDecoration: "none",
              }}
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEpElEQVR4nO2bbYhVRRjHf9fdjWXR0lxRaTPfwkwJV8TCSnRVVKywNEIlXfSLoJUGWRSIvXwoiEgTUlcRFdECe0XUb75QoSAqlIjWaopaJqLoqtvL3j485/DM2Ze795x7ZmZd7w8ue++cOfP8Z86cmWeemYUiRYrczWQ82OwOvAIMB34DNgR/7wp6AKeArPH5F9gGjPCoyxkfoBU/AzQZv5uAXcA4b+ocsBOp7C/I6zcc2AL8Q7RX/ARMB7r4kWmPtUgFrwPlRvpDwCqggWhDHAdqgXvcyrTH82jlnm3leiWwArhMtCEuBun3uZFpjwr0Ka/Pka8r8BpwlmhDXANWAn3tyrTLN0hl/gJK28lbBsxFxgyzIW4Dm4HB9mTaoxatyNg87+mCvDI/Em2Iv5GGGJa+THv0REf9TxLcPx7YTbQhmpCe9XBKGq3yGHAJEf5rAeVUA9sRRypsiCvA0EIF2qI3sI6o4JMplDsIqEOdqp0plJkqGWAxMoKb7u8G4IEU7awPym4ESlIstyB6Ad8TfVd3YKebfow2bpmF8mMzDriAVv4sMMmSrQrgz8DOD5ZsxGIGcAut/JfA/RbtLTZsvWTRTl4sBf5D38d5lu2VAvXorOL1/X+H6JTkYmk7x7C50IG9NqlFp6JzwCMObGaAY+iCqTx3dnvUIN09i6zkHnVk9xn06b/pyGYL+gNX0XX+4w5t70NXiV6WyiXAfnSOn+7Q9hj06X/o0G6Etw0Rnzm2/R26NPYSHxiIvvdHcTsADUMH3DUO7UbYinb9UY5tb0LdXi9BkWrU2dmaUpmDkNXiHqAqR75+SCAkC3yRku3YfB0IuIVEdAuhP/JEzdD45znyf2rkG1mg7UT0QcXWFVBOBfAucJNodCcL3EC20JpTGVzLIj3FC8tQoaMTllEDnDbKaUJ6lbmoWdrKfSuM6zUJbRfMcXTkj0sFEtY2t8QOA08E1zPAiSD9FNGdoa7ofsHBJMLToAoVvizmvQNQvz30Gl+l5erN7AXTjPQlRvoLcYWnxSxDRByX9yngD+PeQ7Qdwe2Guta7g7Qy4Pcg7QQe9wxXByIayH+/biY6bWWR0FV7IatV6NgwHnjduH9BbNUpciAQsS/P/LPRGaMRmJ/nfYMRF7f57HAGzxul4ci9MY+8M9AQeAMwMaatBUR7zhXgyZhlpEoGfSrvtZN3BDpf30C6cRIGIg0xF/EBvFKOPo23cuSrRLpq6KtPtS/NDSVoA7yRI9+mPPPdkYQD2vttXK9BnZxvXYlyyUWkcutauZYBfkadnAcd6nJGGIPb28q1iXSAAKVt6pAKXqXlIcuvyL2S6xTMR59ytZF+Lzo+rPWgKzFxfepdSCUhesrrafS8T4fbn0+bI+iiJHwNzC2xO+oEV5JVVegGDwEmBN/DGN5lZKbo1HRDT3uEi6LQ+bnkS1RSkvSA62gvGIu4uo3B7/bO/XUaeqDhqXrgI3T93tOjLqeYoat64/tzPkW5pBQNkJif1T5FuaYKOfPbPKbvfe3ukim0/IeH5V4VeeBldK8wC5ynAx1WdMUiNBZwm070Xx5xmIwcX3/Rt5AiRYoUyYf/Afajg+opGChMAAAAAElFTkSuQmCC" />
            </Link>
          </div>
          <div id="A3_Container">{this.state.Container}</div>
        </div>
        <Robots />
      </div>
    );
  }
}

export default A3;
