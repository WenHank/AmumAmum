import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { BinarySearchTree, useBinarySearchTree } from "react-tree-vis";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import VanillaTilt from "vanilla-tilt";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import axios from "axios";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Showpdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDoucumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber((prePageNumber) => prePageNumber + offset);
  }
  function changePageBack() {
    changePage(-1);
  }
  function changePageNext() {
    changePage(+1);
  }
  return (
    <div className="pdfcontainer">
      <Document
        file="/BinarySearchTree.pdf"
        onLoadSuccess={onDoucumentLoadSuccess}
      >
        <Page height="1000" pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {pageNumber > 1 && (
          <Button variant="outline-dark" onClick={changePageBack}>
            Previous Page
          </Button>
        )}
        {pageNumber < numPages && (
          <Button variant="outline-dark" onClick={changePageNext}>
            Next Page
          </Button>
        )}
      </div>
    </div>
  );
}

function PDFDocument(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Binary Search Tree Document
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Showpdf />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Try it!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Gamerule(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adelson Velsky Landis Tree Game
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>How to play?</h3>
        <p>Step 1 選擇難度</p>
        <p>Step 2 按下Go play</p>
        <p>Step 3 按下Start 即可開始玩</p>
        <p>若想重新開始則按下Restart 即可</p>
        <h3>How to win?</h3>
        <p>新增或刪除節點來達到該樹的平衡</p>
        <p>在時間內，答對的速度愈快分數愈高，答錯則會扣３分</p>
        <p>若超時則不扣分，並換對方答題</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Go play!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}
var AIOP = {};
let change = 1;
let playerOP = {};
let title = {};
let opArr = [0, 3, 6, 9, 12, 15, 18, 21, 24];
let doing = 0;
var arr = [];
let tmpArr = [];

function BSTGame() {
  const { ref, insert, remove, search, getData, clear, generateRandomTree } =
    useBinarySearchTree();
  const [documentmodalShow, setdocumentModalShow] = React.useState(false);
  const [gamemodalShow, setgameModalShow] = React.useState(false);
  const [diffcultymodalShow, setdiffcultyModalShow] = React.useState(true);
  const [gameovermodalShow, setGameovermodalShow] = React.useState(false);
  const [playergrade, setPlayergrade] = useState(0);
  const [aigrade, setAigrade] = useState(0);
  const [type, setType] = useState(4);
  const [round, setRound] = useState(1);
  const [playerbtn1, setPlaybtn1] = useState(1);
  const [playerbtn2, setPlaybtn2] = useState(1);
  const [playerbtn3, setPlaybtn3] = useState(1);
  const [timerPlay, setTimerPlay] = useState(false);
  const [reset, setReset] = useState(0);
  let whowin = playergrade > aigrade ? "You win" : "You lose";
  let second = 10;
  if (type === 4) {
    second = 10;
  } else if (type === 6) {
    second = 8;
  } else {
    second = 6;
  }
  const options = {
    scale: 1,
    max: 15,
    speed: 250,
  };

  const renderTime = ({ remainingTime }) => {
    let title = "Remaining";
    if (remainingTime <= 3) {
      title = "Hurry up!!";
      let timer = document.querySelector(".timer-wrapper");
      timer.classList.add("toolate");
    }
    if (remainingTime === 0 && round <= type) {
      let timer = document.querySelector(".timer-wrapper");
      timer.classList.remove("toolate");
      setPlaybtn1(1);
      setPlaybtn2(1);
      setPlaybtn3(1);
      if (!doing) {
        doing = 1;
        setTimeout(() => {
          playercontainer.classList.remove("myturn");
          aicontainer.classList.add("myturn");
          AIplay();
        }, 3000);
      }
      return <div className="timer">Too late...</div>;
    }
    return (
      <div className="timer">
        <div className="text">{title}</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };
  let count = 0;
  let tmptype = 4;
  let aicount = 0;
  let orderArr = ["inorder", "preorder", "postorder"];
  let inreArr = ["insert", "remove"];
  function Difficulty(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Body>
          <h2>Start to play!!</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              accentColor: "center",
            }}
          >
            <div style={{ marginRight: "10px" }}>Difficulty </div>
            <Form.Select
              aria-label="Default select example"
              style={{ width: "200px" }}
              value={type}
              onChange={(e) => {
                setType(parseInt(e.target.value));
              }}
            >
              <option value="4">Easy</option>
              <option value="6">Medium</option>
              <option value="8">Hard</option>
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              setdiffcultyModalShow(false);
              generateRandomTree(getRandom(5, 10));
              async function Creatchoice(params) {
                for (let i = 0; i < type + 1; i++) {
                  await generateRandomTree(getRandom(5, 10));
                  let thetitle = getRandom(0, 1);
                  let theorder = getRandom(0, 2);
                  let theinre = getRandom(0, 1);
                  let inValue = getRandom(5, 70);
                  let orderValue = getData(orderArr[theorder]);
                  let thenumber = getRandom(0, orderValue.length - 1);
                  if (thetitle) {
                    title[i] = {
                      Arr: orderValue,
                      Operation: orderArr[theorder],
                      number: orderValue[thenumber],
                      ans: thenumber,
                      title:
                        "根據下圖，請問" +
                        orderValue[thenumber] +
                        "為" +
                        orderArr[theorder] +
                        "的第幾個",
                    };
                    // } else if (theinre) {
                    //   let orderValue = getData("inorder");
                    //   title[i] = {
                    //     Arr: orderValue,
                    //     Operation: inreArr[theinre],
                    //     number: inValue,
                    //     title:
                    //       "根據下圖，請問insert " + inValue + "需要幾步 Search",
                    //   };
                    // } else {
                    //   title[i] = {
                    //     Arr: tmpArr,
                    //     Operation: inreArr[theinre],
                    //     number: tmpArr[thenumber],
                    //     title:
                    //       "根據下圖，請問remove " +
                    //       tmpArr[thenumber] +
                    //       "需要幾步 Search",
                    //   };
                  }
                  let playnumber = [];
                  playnumber[0] = thenumber;
                  playnumber[1] = getRandom(1, 0)
                    ? thenumber + getRandom(1, tmpArr.length - 2)
                    : tmpArr - getRandom(0, thenumber);
                  playnumber[2] = getRandom(1, 0)
                    ? thenumber + getRandom(1, tmpArr.length - 2)
                    : tmpArr - getRandom(0, thenumber);
                  while (playnumber[1] === playnumber[2]) {
                    playnumber[2] = getRandom(1, 0)
                      ? thenumber + getRandom(1, tmpArr.length - 2)
                      : tmpArr - getRandom(0, thenumber);
                  }
                  playnumber.sort(function () {
                    return 0.5 - Math.random();
                  });
                  for (let j = 0; j < 3; j++) {
                    playerOP[count++] = {
                      choice: "Number " + playnumber[j],
                      number: playnumber[j],
                    };
                    AIOP[aicount++] = {
                      choice: "Number " + playnumber[j],
                      number: playnumber[j],
                      do: 0,
                      time: getRandom(3, second - 1) * 1000,
                    };
                  }
                  console.log(AIOP);
                  aicount = 0;
                  for (let i = 0; i < type + 1; i++) {
                    let doArr = [1, 0, 0];
                    doArr.sort(function () {
                      return 0.5 - Math.random();
                    });
                    for (let j = 0; j < 3; j++) {
                      AIOP[aicount++].do = doArr[j];
                    }
                  }
                  console.log(orderValue);
                }
                console.log(title);
                console.log(playerOP);
              }
              Creatchoice();
            }}
          >
            Go play!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function Gameover(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h2>Game Over</h2>
          <p> Your grade: {playergrade}</p>
          <p> AI grade: {aigrade}</p>
          <p>{whowin}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              setGameovermodalShow(false);
              setAigrade(0);
              setPlayergrade(0);
              setPlaybtn1(1);
              setPlaybtn2(1);
              setPlaybtn3(1);
            }}
          >
            Restart!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function makeArr() {
    tmpArr = [];
    for (let i = 0; i < getRandom(5, 10); i++) {
      let tmp = getRandom(5, 70);
      for (let j = 0; j < tmpArr.length; j++) {
        if (tmpArr[j] === tmp) {
          tmpArr.splice(j, 1);
        }
      }
      tmpArr.push(tmp);
    }
  }

  if (change || tmptype !== type) {
    tmptype = type;
    title[0] = {
      title: "根據下圖，請問" + 1 + "為inorder 的第幾個",
    };
    let thetitle = getRandom(0, 1);
    for (let j = 0; j < 3; j++) {
      playerOP[count++] = {
        choice: thetitle ? "Number " + 1 : 1 + " step",
        number: 1,
      };
      AIOP[aicount++] = {
        choice: thetitle ? "Number " + 1 : 1 + " step",
        number: 1,
        do: 0,
        time: getRandom(3, second - 1) * 1000,
      };
    }
    // for (let i = 0; i < type + 1; i++) {
    //   makeArr();
    //   let thenumber = getRandom(0, tmpArr.length - 1);
    //   let thetitle = getRandom(0, 1);
    //   let theorder = getRandom(0, 2);
    //   let theinre = getRandom(0, 1);
    //   let inValue = getRandom(5, 70);
    //   if (thetitle) {
    //     title[i] = {
    //       Arr: tmpArr,
    //       Operation: orderArr[theorder],
    //       number: tmpArr[thenumber],
    //       title:
    //         "根據下圖，請問" +
    //         tmpArr[thenumber] +
    //         "為" +
    //         orderArr[theorder] +
    //         "的第幾個",
    //     };
    //   } else if (theinre) {
    //     title[i] = {
    //       Arr: tmpArr,
    //       Operation: inreArr[theinre],
    //       number: inValue,
    //       title: "根據下圖，請問insert " + inValue + "需要幾步 Search",
    //     };
    //   } else {
    //     title[i] = {
    //       Arr: tmpArr,
    //       Operation: inreArr[theinre],
    //       number: tmpArr[thenumber],
    //       title:
    //         "根據下圖，請問remove " + tmpArr[thenumber] + "需要幾步 Search",
    //     };
    //   }
    //   let playnumber = [];
    //   playnumber[0] = thenumber;
    //   playnumber[1] = getRandom(1, 0)
    //     ? thenumber + getRandom(1, tmpArr.length - 2)
    //     : tmpArr - getRandom(0, thenumber);
    //   playnumber[2] = getRandom(1, 0)
    //     ? thenumber + getRandom(1, tmpArr.length - 2)
    //     : tmpArr - getRandom(0, thenumber);
    //   while (playnumber[1] === playnumber[2]) {
    //     playnumber[2] = getRandom(1, 0)
    //       ? thenumber + getRandom(1, tmpArr.length - 2)
    //       : tmpArr - getRandom(0, thenumber);
    //   }
    //   playnumber.sort(function () {
    //     return 0.5 - Math.random();
    //   });
    //   for (let j = 0; j < 3; j++) {
    //     playerOP[count++] = {
    //       choice: thetitle
    //         ? "Number " + playnumber[j]
    //         : playnumber[j] + " step",
    //       number: playnumber[j],
    //     };
    //     AIOP[aicount++] = {
    //       choice: thetitle
    //         ? "Number " + playnumber[j]
    //         : playnumber[j] + " step",
    //       number: playnumber[j],
    //       do: 0,
    //       time: getRandom(3, second - 1) * 1000,
    //     };
    //   }
    // }
    // aicount = 0;
    // for (let i = 0; i < type + 1; i++) {
    //   let doArr = [1, 0, 0];
    //   doArr.sort(function () {
    //     return 0.5 - Math.random();
    //   });
    //   for (let j = 0; j < 3; j++) {
    //     AIOP[aicount++].do = doArr[j];
    //   }
    // }
    change = 0;
  }
  let playercontainer = document.querySelector(".playtitle");
  let aicontainer = document.querySelector(".aititle");
  if (round > type) {
    console.log("this1");
    setPlaybtn1(1);
    setPlaybtn2(1);
    setPlaybtn3(1);
    setRound(1);
    setGameovermodalShow(true);
    setTimerPlay(false);
    playercontainer.classList.remove("myturn");
    aicontainer.classList.remove("myturn");
  }
  function AIplay() {
    doing = 0;
    for (let i = 0; i < 3; i++) {
      if (AIOP[opArr[round - 1] + i].do === 1) {
        if (AIOP[opArr[round - 1] + i].IR === "Insert") {
          setTimeout(() => {
            console.log("insert");
            insert(AIOP[opArr[round - 1] + i].number);
            search(AIOP[opArr[round - 1] + i].number);
            setPlaybtn1(0);
            setPlaybtn2(0);
            setPlaybtn3(0);
            playercontainer.classList.add("myturn");
            aicontainer.classList.remove("myturn");
            setAigrade(aigrade + 5);
            if (round <= type) {
              setRound(round + 1);
            }
            if (reset) {
              setReset(0);
              console.log("reset2");
            } else {
              setReset(1);
              console.log("reset2");
            }
          }, AIOP[opArr[round - 1] + i].time);
        } else {
          setTimeout(() => {
            console.log("Remove");
            let orderValue = getData("inorder");
            let tmp = 0;
            orderValue.forEach((e) => {
              if (e === AIOP[opArr[round - 1] + i].number) {
                tmp = 1;
              }
            });
            if (tmp) {
              search(AIOP[opArr[round - 1] + i].number);
              remove(AIOP[opArr[round - 1] + i].number);
              setAigrade(aigrade + 5);
              setPlaybtn1(0);
              setPlaybtn2(0);
              setPlaybtn3(0);
              playercontainer.classList.add("myturn");
              aicontainer.classList.remove("myturn");
              if (round <= type) {
                setRound(round + 1);
              }
              if (reset) {
                setReset(0);
                console.log("reset2");
              } else {
                setReset(1);
                console.log("reset2");
              }
            } else {
              setAigrade(aigrade - 3);
              if (reset) {
                setReset(0);
                console.log("reset2");
              } else {
                setReset(1);
                console.log("reset2");
              }
              setPlaybtn1(0);
              setPlaybtn2(0);
              setPlaybtn3(0);
              playercontainer.classList.add("myturn");
              aicontainer.classList.remove("myturn");
              if (round <= type) {
                setRound(round + 1);
              }
            }
          }, AIOP[opArr[round - 1] + i].time);
        }
        break;
      }
    }
  }
  console.log(gameovermodalShow);

  const [UserData, setUserData] = useState("");

  useEffect(() => {
    const GetSid = sessionStorage.getItem("Sid");
    axios({
      method: "POST",
      data: {
        _id: GetSid,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_USERINFO,
    }).then((response) => {
      setUserData(response.data);
    });
  }, []);
  return (
    <div className="A3">
      <div className="BSTgame">
        <div className="gamehintContainer" style={{ marginLeft: "250px" }}>
          <div className="loader"></div>
          <img
            className="gamerule"
            onClick={() => setgameModalShow(true)}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACUElEQVRoge2av04bQRDGfzoJYUVujBSUBJyGUFJZ4g3SJqGJ6IBXoCKv4LT0KYIipaBKlwKSUCXQ0URI/CmQsS0jKJyEAskpdiyfImNm9tbni3yftNrV+fb7Zry3s6udhR6eAltAC+ikXK6Bb8AqEJEA80BjBA70K1+BKR8nIuBASHaBGR8So96+6O2IXgk3GjV5fgAUrMRL0vkcKAYy1lfvCXAkv1etxB+l40ZCA0PpVYBb4A/w0EJ8KsSVJNYF1tuWd9YtxDfSqeRtmg0avWV555OWNJIOaUKj913qBS1pBFxIe85qkSc0eg2p1XMkAn5I+7mHUT7Q6P2W+oGF+BXphl+tXneBVCO+IH4BZj0NtOh1F8RBemZHAJ4Bde7fPgyrBHMEoAy8ZzSbxqCO3IXghMPQTbRlzhJyR7KG3JGsYewdKQJn9ELk3h3PtWWPhAg1IknXmVTWqXxBTBO5I1lDHrX+QR61QumO/RzJHMbekTxqDam/WiSPWp6YjLX7fYot3NFV2UI6ihGZQDe36rjDRRWy+GnN4vKdHdxxr+rL6keYRtS67w8s4g7CO8DL/zlqtYFNaS9rOvwSIVOuIgDaCt2KvHOsGZFLqacTGmZFU6F7IvVjjSOHUi96m+SHnxZdjSM7Ur/2MscfnxW63TxkTUM4jUve35JeLh7gES6XOEj3DW6OfNCSVqXDEe6aRVp4O0A3Hn5faAkL9PKMNWANzxs8RhTo5RvjuvEFcR/jVmsKdwXJutgNs1xg2KLEEQEruEtiVyN0oAm8I5YR/guUqaZe1GPGYQAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="gamehintContainer" style={{ marginRight: "250px" }}>
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setdocumentModalShow(true)}
          />
        </div>
        <div className="roundContainer" style={{ marginRight: "500px" }}>
          <h2>Round {round}</h2>
        </div>
        <div className="controlContainer">
          <div className="timer-wrapper">
            <CountdownCircleTimer
              key={reset}
              isPlaying={timerPlay}
              duration={second}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[10, 6, 3, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 3 })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
          <div>
            <Button
              className="startbtn"
              variant="outline-dark"
              style={{ marginTop: "20px" }}
              onClick={() => {
                setTimerPlay(true);
                let btn = document.querySelector(".startbtn");
                btn.disabled = 1;
                setPlaybtn1(0);
                setPlaybtn2(0);
                setPlaybtn3(0);
                let playercontainer = document.querySelector(".playtitle");
                playercontainer.classList.add("myturn");
              }}
            >
              Start
            </Button>
            <Button
              variant="outline-dark"
              style={{ marginTop: "20px" }}
              onClick={() => {
                setTimerPlay(false);
                let btn = document.querySelector(".startbtn");
                btn.disabled = 0;
                setPlaybtn1(1);
                setPlaybtn2(1);
                setPlaybtn3(1);
                let playercontainer = document.querySelector(".playtitle");
                playercontainer.classList.remove("myturn");
                setdiffcultyModalShow(true);
                setReset(!reset);
              }}
            >
              Restart
            </Button>
          </div>
        </div>
        <h1>BST</h1>

        <div className="interactiveInterface">
          <Tilt className="gametitle playtitle" options={options}>
            <div className="playercontainer">
              <div className="namegrade">
                <div className="thegrade">{aigrade}</div>
                <h3>{UserData.Name}</h3>
              </div>
              <div className="options">
                <Button
                  className="playerbtn1"
                  variant="outline-dark"
                  disabled={playerbtn1}
                  onClick={() => {
                    playercontainer.classList.remove("myturn");
                    aicontainer.classList.add("myturn");
                    setPlaybtn1(1);
                    setPlaybtn2(1);
                    setPlaybtn3(1);
                    if (playerOP[opArr[round - 1]].IR === "Insert") {
                      insert(playerOP[opArr[round - 1]].number);
                      search(playerOP[opArr[round - 1]].number);
                      setPlayergrade(playergrade + 5);
                    } else {
                      let orderValue = getData("inorder");
                      let tmp = 0;
                      orderValue.forEach((e) => {
                        if (e === playerOP[opArr[round - 1]].number) {
                          tmp = 1;
                        }
                      });
                      if (tmp) {
                        search(playerOP[opArr[round - 1]].number);
                        remove(playerOP[opArr[round - 1]].number);
                        setPlayergrade(playergrade + 5);
                      } else {
                        setPlayergrade(playergrade - 3);
                      }
                    }
                    console.log("reset1");
                    setReset(!reset);
                    console.log("AI");
                    AIplay();
                  }}
                >
                  {playerOP[opArr[round - 1]].choice}
                </Button>
                <Button
                  className="playerbtn2"
                  variant="outline-dark"
                  disabled={playerbtn2}
                  onClick={() => {
                    playercontainer.classList.remove("myturn");
                    aicontainer.classList.add("myturn");
                    setPlaybtn1(1);
                    setPlaybtn2(1);
                    setPlaybtn3(1);
                    if (playerOP[opArr[round - 1] + 1].IR === "Insert") {
                      insert(playerOP[opArr[round - 1] + 1].number);
                      search(playerOP[opArr[round - 1] + 1].number);
                      setPlayergrade(playergrade + 5);
                    } else {
                      let orderValue = getData("inorder");
                      let tmp = 0;
                      orderValue.forEach((e) => {
                        if (e === playerOP[opArr[round - 1] + 1].number) {
                          tmp = 1;
                        }
                      });
                      if (tmp) {
                        search(playerOP[opArr[round - 1] + 1].number);
                        remove(playerOP[opArr[round - 1] + 1].number);
                        setPlayergrade(playergrade + 5);
                      } else {
                        setPlayergrade(playergrade - 3);
                      }
                    }
                    console.log("reset1");
                    setReset(!reset);
                    console.log("AI");
                    AIplay();
                  }}
                >
                  {playerOP[opArr[round - 1] + 1].choice}
                </Button>
                <Button
                  className="playerbtn3"
                  variant="outline-dark"
                  disabled={playerbtn3}
                  onClick={() => {
                    playercontainer.classList.remove("myturn");
                    aicontainer.classList.add("myturn");
                    setPlaybtn1(1);
                    setPlaybtn2(1);
                    setPlaybtn3(1);
                    if (playerOP[opArr[round - 1] + 2].IR === "Insert") {
                      insert(playerOP[opArr[round - 1] + 2].number);
                      search(playerOP[opArr[round - 1] + 2].number);
                      setPlayergrade(playergrade + 5);
                    } else {
                      let orderValue = getData("inorder");
                      let tmp = 0;
                      orderValue.forEach((e) => {
                        if (e === playerOP[opArr[round - 1] + 2].number) {
                          tmp = 1;
                        }
                      });
                      if (tmp) {
                        search(playerOP[opArr[round - 1] + 2].number);
                        remove(playerOP[opArr[round - 1] + 2].number);
                        setPlayergrade(playergrade + 5);
                      } else {
                        setPlayergrade(playergrade - 3);
                      }
                    }
                    console.log("reset1");
                    setReset(!reset);
                    console.log("AI");
                    AIplay();
                  }}
                >
                  {playerOP[opArr[round - 1] + 2].choice}
                </Button>
              </div>
            </div>
          </Tilt>
          <div style={{ margin: "20px" }}></div>
          <Tilt className="gametitle aititle" options={options}>
            <div className="AIcontainer">
              <div className="namegrade">
                <div className="thegrade">{aigrade}</div>
                <h3>AI</h3>
              </div>
              <div className="options">
                <Button
                  className="aibtn1"
                  variant="outline-dark"
                  disabled={true}
                >
                  {AIOP[opArr[round - 1]].choice}
                </Button>{" "}
                <Button
                  className="aibtn2"
                  variant="outline-dark"
                  disabled={true}
                >
                  {AIOP[opArr[round - 1] + 1].choice}
                </Button>
                <Button
                  className="aibtn3"
                  variant="outline-dark"
                  disabled={true}
                >
                  {AIOP[opArr[round - 1] + 2].choice}
                </Button>
              </div>
            </div>
          </Tilt>
        </div>
        <div style={{ marginTop: "20px" }}>{title[round - 1].title}</div>
        <BinarySearchTree data={arr} ref={ref} />

        <PDFDocument
          show={documentmodalShow}
          onHide={() => setdocumentModalShow(false)}
        />
        <Gamerule show={gamemodalShow} onHide={() => setgameModalShow(false)} />
        <Difficulty
          show={diffcultymodalShow}
          onHide={() => setdiffcultyModalShow(false)}
        />
        <Gameover
          show={gameovermodalShow}
          onHide={() => setGameovermodalShow(false)}
        />
      </div>
    </div>
  );
}

export default BSTGame;
