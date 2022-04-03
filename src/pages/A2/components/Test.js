import React from "react";
import {
  Button,
  Modal,
  Form,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { MDBContainer } from "mdbreact";
import A2_Header from "./Header";

var avlInorder = [
  5 + "->",
  12 + "->",
  18 + "->",
  26 + "->",
  54 + "->",
  68 + "->",
  69,
];
var avlPreorder = [
  54 + "->",
  18 + "->",
  5 + "->",
  12 + "->",
  26 + "->",
  68 + "->",
  69,
];
var rbtInorder = [
  18 + "->",
  23 + "->",
  31 + "->",
  46 + "->",
  56 + "->",
  58 + "->",
  70,
];
var rbtPostorder = [
  18 + "->",
  23 + "->",
  56 + "->",
  46 + "->",
  70 + "->",
  58 + "->",
  31,
];

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Binary Search Tree
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>What is Binary Search Tree ?</h3>
        <p>
          簡單來說就是，任一個節點的
          <span style={{ color: "#4874b1" }}>左子樹都比父節點小</span> ，
          <span style={{ color: "#4874b1" }}>右子樹都比父節點大</span>
          ，
          <br />
          且每一個節點的值都不重複。所以當我們要查找資料的時候，就可以從根節點開始，
          <br />
          比根節點<span style={{ color: "#4874b1" }}>小的就從左子樹</span>
          開始找，比較<span style={{ color: "#4874b1" }}>大的就從右子樹</span>
          開始找。
          <br />
          相對於其他資料結構而言，尋找、插入的時間複雜度較低，為Ｏ(logN)。
        </p>
        <h3>How can we use Binary Search Tree ?</h3>
        <p>我們可以把資料建立成Binary Search Tree，以降低我們搜尋的時間</p>
        <h3>About function</h3>
        <p>
          Random: 可隨機新增一顆樹
          <br />
          Clear: 刪除整棵樹
          <br />
          Hide: 叫出記錄表()
          <br />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Try it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Test() {
  const [Ans1, setAns1] = useState("");
  const [Ans2, setAns2] = useState("");
  const [Ans3, setAns3] = useState("");
  const [Ans4, setAns4] = useState("");
  const [Ans5, setAns5] = useState("");
  const [Ans6, setAns6] = useState("");
  const [Ans7, setAns7] = useState("");
  const [Ans8, setAns8] = useState("");
  const [Ans9, setAns9] = useState("");
  const [Ans10, setAns10] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");

  let tmp = [...record];

  return (
    <div className="A2">
      <A2_Header />
      <div className="test">
        <div className="hintContainer">
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>Test</h1>
        <div className="AnsInput">
          <p>1.根據圖一，insert 69 之後的Preorder結果為何？(請用逗號區隔)</p>
          <input
            type="string"
            style={{ width: "300px", marginBottom: "10px" }}
            onChange={(elem) => {
              let tmp = elem.target.value;
              tmp = tmp.split(",");
              let ans = [58, 54, 31, 5, 7, 70, 69, 76];
              let flag = 0;
              for (let i = 0; i < 8; i++) {
                if (parseInt(tmp[i]) !== ans[i]) {
                  console.log("wrong");
                  setAns1(10);
                } else {
                  flag++;
                }
              }
              if (flag === 7) {
                setAns1(11);
                console.log("correct");
              } else {
                setAns1(10);
                console.log("wrong");
              }
            }}
          />
          <img
            style={{
              height: "300px",
              width: "fit-content",
              display: "flex",
              left: "28%",
              position: "relative",
            }}
            src="/Img/testbst.png"
          />
          <p style={{ display: "flex", justifyContent: "center" }}>圖一</p>
          <p>2.根據圖二，remove 37 之後的Postorder結果為何？(請用逗號區隔)</p>
          <input
            type="string"
            style={{ width: "300px", marginBottom: "10px" }}
            onChange={(elem) => {
              let tmp = elem.target.value;
              tmp = tmp.split(",");
              let ans = [15, 35, 52, 63, 79, 44];
              let flag = 0;
              for (let i = 0; i < 7; i++) {
                if (parseInt(tmp[i]) !== ans[i]) {
                  console.log("wrong");
                  setAns2(20);
                } else {
                  flag++;
                }
              }
              if (flag === 6) {
                setAns2(21);
                console.log("correct");
              } else {
                setAns2(20);
                console.log("wrong");
              }
            }}
          />
          <img
            style={{
              height: "300px",
              width: "fit-content",
              display: "flex",
              left: "26%",
              position: "relative",
            }}
            src="/Img/testavl.png"
          />
          <p style={{ display: "flex", justifyContent: "center" }}>圖二</p>
          <p>3.根據圖三，remove 58 之後的Preorder結果為何？(請用逗號區隔)</p>
          <input
            type="string"
            style={{ width: "300px", marginBottom: "10px" }}
            onChange={(elem) => {
              let tmp = elem.target.value;
              tmp = tmp.split(",");
              let ans = [45, 38, 23, 61, 72, 63];
              let flag = 0;
              for (let i = 0; i < 7; i++) {
                if (parseInt(tmp[i]) !== ans[i]) {
                  console.log("wrong");
                  setAns3(30);
                } else {
                  flag++;
                }
              }
              console.log(flag);
              if (flag === 6) {
                setAns3(31);
                console.log("correct");
              } else {
                setAns3(30);
                console.log("wrong");
              }
              console.log("---------------------");
            }}
          />
          <img
            style={{
              height: "300px",
              width: "fit-content",
              display: "flex",
              left: "26%",
              position: "relative",
            }}
            src="/Img/testrbt.png"
          />
          <p style={{ display: "flex", justifyContent: "center" }}>圖三</p>
          <p>
            4.根據下列的Inorder和Preorder，請問此棵樹的最右邊的leaf為何(avl)
            <br />
            Inorder {avlInorder}
            <br />
            Preorder {avlPreorder}
          </p>
          <input
            type="string"
            onChange={(elem) => {
              if (parseInt(elem.target.value) === 69) {
                setAns4(41);
                console.log("correct");
              } else {
                console.log("wrong");
                setAns4(40);
              }
            }}
          />
          <p>
            5.根據下列的Inorder和Postorder，請問此棵樹的最右邊的leaf為何(rbt)
            <br />
            Inorder {rbtInorder}
            <br />
            Postorder {rbtPostorder}
          </p>
          <input
            type="string"
            onChange={(elem) => {
              if (parseInt(elem.target.value) === 70) {
                setAns5(51);
                console.log("correct");
              } else {
                console.log("wrong");
                setAns5(50);
              }
            }}
          />
          <p>6.一顆二元搜尋樹的左右子樹必為二元搜尋樹？</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <ToggleButtonGroup type="radio" name="options1">
              <ToggleButton
                id="tbg-radio-1"
                variant="secondary"
                style={{ marginRight: "10px" }}
                value={61}
                onClick={() => {
                  setAns6(61);
                }}
              >
                True
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-2"
                variant="secondary"
                value={60}
                onClick={() => {
                  setAns6(60);
                }}
              >
                False
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <p>7.一顆樹的左子樹為AVL，右子樹也為AVL，則他必為AVL？</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <ToggleButtonGroup type="radio" name="options2">
              <ToggleButton
                id="tbg-radio-3"
                variant="secondary"
                style={{ marginRight: "10px" }}
                value={70}
                onClick={() => {
                  setAns7(70);
                }}
              >
                True
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-4"
                variant="secondary"
                value={71}
                onClick={() => {
                  setAns7(71);
                }}
              >
                False
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <p>
            8.如果今天的資料是靜態的，只需要做查詢的動作，
            <br />
            請問何種資料結構較適合？
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <ToggleButtonGroup type="radio" name="options3">
              <ToggleButton
                id="tbg-radio-5"
                variant="secondary"
                style={{ marginRight: "10px" }}
                value={801}
                onClick={() => {
                  setAns8(80);
                }}
              >
                BST
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-6"
                variant="secondary"
                style={{ marginRight: "10px" }}
                value={81}
                onClick={() => {
                  setAns8(81);
                }}
              >
                AVL
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-7"
                variant="secondary"
                value={802}
                onClick={() => {
                  setAns8(80);
                }}
              >
                RBT
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <p>
            9.如果今天的資料是需要時常做插入刪除的動作，
            <br />
            請問何種資料結構較適合？
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}
          >
            <ToggleButtonGroup type="radio" name="options4">
              <ToggleButton
                id="tbg-radio-8"
                variant="secondary"
                style={{ marginRight: "10px" }}
                value={901}
                onClick={() => {
                  setAns9(90);
                }}
              >
                BST
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-9"
                variant="secondary"
                style={{ marginRight: "10px" }}
                value={902}
                onClick={() => {
                  setAns9(90);
                }}
              >
                AVL
              </ToggleButton>
              <ToggleButton
                id="tbg-radio-10"
                variant="secondary"
                value={91}
                onClick={() => {
                  setAns9(91);
                }}
              >
                RBT
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <p>
            10.假設你是Netflix影音出租店的店員，今天10部影片分別是，而你今天必須透過資料結構來管理這筆資料，
            請在下方寫出你會運用什麼資料結構？為什麼會選擇他？如何運用它？
          </p>
          <img
            style={{
              height: "300px",
              width: "fit-content",
              display: "flex",
              left: "18%",
              position: "relative",
            }}
            src="/Img/testtable.png"
          />
          <textarea
            style={{ marginTop: "10px", height: "150px" }}
            onChange={(e) => {
              console.log(e.target.value);
              setAns10(e.target.value);
            }}
          >
            Hello there, this is some text in a text area
          </textarea>
        </div>
        <div className={`record ${open === "show" && "open"} `}>
          <div className="recordContainer">
            <Button
              variant="secondary"
              onClick={() => {
                if (open === "hide") {
                  setOpen("show");
                } else {
                  setOpen("hide");
                }
              }}
            >
              {open}
            </Button>
            <MDBContainer>
              <div
                className="scrollbar body mx-auto"
                style={(scrollContainerStyle, { whiteSpace: "pre-wrap" })}
              >
                <div className="title">Your grades</div>
                {tmp.reverse()}
              </div>
            </MDBContainer>
          </div>
        </div>
        <Button
          variant="secondary"
          style={{ marginTop: "10px" }}
          onClick={() => {
            let ans = [];
            ans.push(Ans1);
            ans.push(Ans2);
            ans.push(Ans3);
            ans.push(Ans4);
            ans.push(Ans5);
            ans.push(Ans6);
            ans.push(Ans7);
            ans.push(Ans8);
            ans.push(Ans9);
            ans.sort((a, b) => {
              return a - b;
            });
            let grade = 0;
            let tmp = [];
            for (let i = 0; i < 9; i++) {
              if (parseInt(ans[i]) % 2 === 0 || ans[i] === "") {
                tmp.push("第" + (i + 1) + "題答錯 \n");
              } else {
                grade += 10;
              }
            }
            setRecord((prevArray) => [
              ...record,
              <div>
                <p className="recordP">
                  {"Grade :" + grade + "\n" + tmp}
                  <span style={{ fontSize: "10px", color: "wheat" }}>
                    {new Date().toLocaleTimeString() +
                      "\n" +
                      new Date().getFullYear() +
                      "年" +
                      (new Date().getMonth() + 1) +
                      "月" +
                      new Date().getDate() +
                      "日"}
                  </span>
                </p>
              </div>,
            ]);
            ans.push(Ans10);
            console.log(ans);
          }}
        >
          Submit
        </Button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
}

export default Test;
