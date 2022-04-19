import React from "react";
import A3_Headr from "./Header";
import ReactCardFlip from "react-card-flip";
import { useState, useEffect } from "react";
import { MDBContainer } from "mdbreact";
import { Button, Modal } from "react-bootstrap";

let clicknum = 0;
let work = 0;
let firstclick;
let change = 1;
let secondclick;
let Cards;
let arr = [];
let grade = 0;
for (let i = 0; i < 12; i++) {
  arr.push(i);
}
arr.sort(() => {
  return 0.5 - Math.random();
});
let cardcontent = [
  {
    title: "在A Tree中，insert 6的第一個 Inorder",
    bg: "#ab3b3b",
    ans: "6",
    id: "0",
  },
  {
    title: "在A Tree中，remove 11的倒數第2個 Postorder",
    bg: "#e1861a",
    ans: "54",
    id: "1",
  },
  {
    title: "在A Tree中，insert 80的第3個 Preorder",
    bg: "#46bd52",
    ans: "8",
    id: "2",
  },
  {
    title: "若左子樹和右子樹皆為BST，則整棵樹必為BST",
    bg: "#33c9a3",
    ans: "F",
    id: "3",
  },
  { title: "BST的左子點皆大於右子點", bg: "#436eb5", ans: "T", id: "4" },
  { title: "在A Tree中，search 78的步數", bg: "#e2d165", ans: "3", id: "5" },
  { title: "在B Tree中，8的左子點", bg: "#ab3b3b", ans: "6", id: "6" },
  {
    title: "在B Tree中，insert 5的倒數第4個 Postorder",
    bg: "#e1861a",
    ans: "54",
    id: "7",
  },
  {
    title: "在B Tree中，delete 54的第2個 Preorder",
    bg: "#46bd52",
    ans: "8",
    id: "8",
  },
  {
    title: "BST的search time必為O(logn)",
    bg: "#33c9a3",
    ans: "F",
    id: "9",
  },
  {
    title: "BST的insert和remove在平均情況下為 O(logn)",
    bg: "#436eb5",
    ans: "T",
    id: "10",
  },
  { title: "在B Tree中，search 6的步數", bg: "#e2d165", ans: "3", id: "11" },
];
let fliparr = [];
for (let i = 0; i < 12; i++) {
  fliparr[i] = 0;
}
function Card(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <div
        onClick={() => {
          if (clicknum < 2) {
            setIsFlipped((prev) => !prev);
            if (firstclick) {
              for (let i = 0; i < Cards.length; i++) {
                Cards[i].style.cursor = "initial";
              }
              secondclick = props.id;
              clicknum++;
              work = 1;
            } else {
              Cards = document.querySelectorAll(".CardFront");
              firstclick = props.id;
              clicknum++;
            }
          }
        }}
        className="CardFront"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>{props.tiile}</div>
          <div>Click me!</div>
        </div>
      </div>
      <div
        onMouseMove={() => {
          if (work) {
            if (change) {
              if (
                Math.abs(parseInt(firstclick) - parseInt(secondclick)) != 6 &&
                clicknum === 2
              ) {
                grade -= 5;
                change = 0;
              } else {
                grade += 20;
                console.log("here");
                change = 0;
              }
            }
            if (
              Math.abs(parseInt(firstclick) - parseInt(secondclick)) != 6 &&
              clicknum === 2
            ) {
              let tmp1 = document.getElementById(`${firstclick}`);
              let tmp2 = document.getElementById(`${secondclick}`);
              setTimeout(() => {
                tmp1.classList.add("answrong");
                tmp2.classList.add("answrong");
              }, 500);
              setTimeout(() => {
                tmp1.classList.remove("answrong");
                tmp2.classList.remove("answrong");
                firstclick = 0;
                secondclick = 0;
                clicknum = 0;
                work = 0;
                change = 1;
                for (let i = 0; i < Cards.length; i++) {
                  Cards[i].style.cursor = "pointer";
                }
              }, 900);
            } else {
              let tmp1 = document.getElementById(`${firstclick}`);
              let tmp2 = document.getElementById(`${secondclick}`);
              setTimeout(() => {
                tmp1.classList.add("anscorrect");
                tmp2.classList.add("anscorrect");
              }, 500);
              setTimeout(() => {
                tmp1.classList.remove("anscorrect");
                tmp2.classList.remove("anscorrect");
                firstclick = 0;
                secondclick = 0;
                clicknum = 0;
                work = 0;
                change = 1;
                for (let i = 0; i < Cards.length; i++) {
                  Cards[i].style.cursor = "pointer";
                }
              }, 900);
            }
          }
        }}
        className="CardBack"
        id={props.id}
        style={{ background: `${props.bg}` }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>{props.ans}</div>
        </div>
      </div>
    </ReactCardFlip>
  );
}

const AllCards = () => {
  return (
    <div className="Cards">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Card
          bg={cardcontent[arr[0]].bg}
          tiile={cardcontent[arr[0]].title}
          ans={cardcontent[arr[0]].ans}
          id={cardcontent[arr[0]].id}
        />
        <Card
          bg={cardcontent[arr[1]].bg}
          tiile={cardcontent[arr[1]].title}
          ans={cardcontent[arr[1]].ans}
          id={cardcontent[arr[1]].id}
        />{" "}
        <Card
          bg={cardcontent[arr[2]].bg}
          tiile={cardcontent[arr[2]].title}
          ans={cardcontent[arr[2]].ans}
          id={cardcontent[arr[2]].id}
        />
        <Card
          bg={cardcontent[arr[3]].bg}
          tiile={cardcontent[arr[3]].title}
          ans={cardcontent[arr[3]].ans}
          id={cardcontent[arr[3]].id}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Card
          bg={cardcontent[arr[4]].bg}
          tiile={cardcontent[arr[4]].title}
          ans={cardcontent[arr[4]].ans}
          id={cardcontent[arr[4]].id}
        />
        <Card
          bg={cardcontent[arr[5]].bg}
          tiile={cardcontent[arr[5]].title}
          ans={cardcontent[arr[5]].ans}
          id={cardcontent[arr[5]].id}
        />{" "}
        <Card
          bg={cardcontent[arr[6]].bg}
          tiile={cardcontent[arr[6]].title}
          ans={cardcontent[arr[6]].ans}
          id={cardcontent[arr[6]].id}
        />
        <Card
          bg={cardcontent[arr[7]].bg}
          tiile={cardcontent[arr[7]].title}
          ans={cardcontent[arr[7]].ans}
          id={cardcontent[arr[7]].id}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Card
          bg={cardcontent[arr[8]].bg}
          tiile={cardcontent[arr[8]].title}
          ans={cardcontent[arr[8]].ans}
          id={cardcontent[arr[8]].id}
        />
        <Card
          bg={cardcontent[arr[9]].bg}
          tiile={cardcontent[arr[9]].title}
          ans={cardcontent[arr[9]].ans}
          id={cardcontent[arr[9]].id}
        />{" "}
        <Card
          bg={cardcontent[arr[10]].bg}
          tiile={cardcontent[arr[10]].title}
          ans={cardcontent[arr[10]].ans}
          id={cardcontent[arr[10]].id}
        />
        <Card
          bg={cardcontent[arr[11]].bg}
          tiile={cardcontent[arr[11]].title}
          ans={cardcontent[arr[11]].ans}
          id={cardcontent[arr[11]].id}
        />
      </div>
    </div>
  );
};

function MyVerticallyCenteredModal(props) {
  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Binary Search Tree Interactive
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>What can you do ?</h3>
        <p>
          透過拖拉下方的方塊，將其排列成中序,前序,後序的
          <br />
          並且按下Submit來知道你的答案是否正確
          <br />
          假如你還想做更多測驗的話
          <br />
          你可以按下Random之後，會有更多的題目讓你練習
        </p>
        <h3>About function</h3>
        <p>
          Random: 可隨機生成一棵樹
          <br />
          Change: 更改拖曳欄位
          <br />
          Submit: 送出答案
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
function RBTInteractive() {
  const [modalShow, setModalShow] = React.useState(false);
  const [record, setRecord] = useState("");
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");
  useEffect(() => {
    setRecord(
      <div>
        <p className="recordP">
          {grade + " point"}
          <p style={{ fontSize: "10px", color: "wheat" }}>
            {new Date().toLocaleTimeString() +
              "\n" +
              new Date().getFullYear() +
              "年" +
              (new Date().getMonth() + 1) +
              "月" +
              new Date().getDate() +
              "日"}
          </p>
        </p>
      </div>
    );
  }, [grade]);
  return (
    <div className="A3">
      <A3_Headr />
      <div className="RBTInteractive">
        <div className="hintContainer">
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>RBT Interactive</h1>
        <div
          style={{
            display: "flex",
            flexDiraction: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <img
            src="/Img/interactive.png"
            style={{ height: "600px", marginRight: "10px" }}
          />
          <AllCards />
        </div>
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
              <div className="title">Your Grade</div>
              {record}
            </div>
          </MDBContainer>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
export default RBTInteractive;
