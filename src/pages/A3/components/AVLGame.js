import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { MDBContainer } from "mdbreact";
import { AVLTree, useAVLTree } from "react-tree-vis";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import VanillaTilt from "vanilla-tilt";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var arr = [];
for (let i = 0; i < getRandom(5, 10); i++) {
  let tmp = getRandom(5, 70);
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === tmp) {
      arr.splice(j, 1);
    }
  }
  arr.push(tmp);
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
      <Document file="/AVL.pdf" onLoadSuccess={onDoucumentLoadSuccess}>
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
          Adelson Velsky Landis Tree Interactive
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

function GameMyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adelson Velsky Landis Tree Interactive
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>How to play?</h3>
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
let opArr = [0, 3, 6, 9, 12, 15, 18, 21];

function AVLGame() {
  const { ref, insert, remove, search, getData, clear, generateRandomTree } =
    useAVLTree();
  const [modalShow, setModalShow] = React.useState(false);
  const [gamemodalShow, setgameModalShow] = React.useState(false);
  const [diffcultymodalShow, setdiffcultyModalShow] = React.useState(true);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");
  const [playergrade, setPlayergrade] = useState(0);
  const [aigrade, setAigrade] = useState(0);
  let tmp = [...record];
  const [type, setType] = useState(4);
  const [round, setRound] = useState(1);
  const [playerbtn1, setPlaybtn1] = useState(1);
  const [playerbtn2, setPlaybtn2] = useState(1);
  const [playerbtn3, setPlaybtn3] = useState(1);
  let starttimer;
  let fuck = 0;
  function firstStart(params) {
    console.log("firstStart");
    let number = 3;
    var timer = document.querySelector(".timer");
    timer.innerText = number;
    firstStart = setInterval(() => {
      number--;
      console.log(number);
      if (number === 0) {
        console.log("fuck");
        timer.innerText = "Start";
      } else if (number === -1) {
        setPlaybtn1(0);
        setPlaybtn2(0);
        setPlaybtn3(0);
        start();
        clearInterval(firstStart);
      } else {
        timer.innerText = number;
      }
    }, 1000);
  }

  function start() {
    console.log("timer start");
    let number = 10;
    let count = 0;
    var timer = document.querySelector(".timer");
    timer.innerText = number;
    fuck++;
    clearInterval(starttimer);
    starttimer = setInterval(() => {
      console.log("timer" + fuck);
      number--;
      if (number <= 0) {
        number = 10;
        count++;
        if (count === 1) {
          number = 1;
          clearInterval(starttimer);
        }
      }
      timer.innerText = number;
    }, 1000);
    console.log("------------------------");
  }
  const options = {
    scale: 1,
    max: 15,
    speed: 250,
  };

  function DifficultyMyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
                setType(e.target.value);
              }}
            >
              <option value="4">Easy</option>
              <option value="6">Medium</option>
              <option value="8">Hard</option>
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={props.onHide}>
            Go play!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  let count = 0;
  let aicount = 0;
  if (change) {
    for (let i = 0; i < type; i++) {
      let iN = 0;
      let rN = 0;
      let aiN = 0;
      let arN = 0;

      for (let j = 0; j < 3; j++) {
        let tmp = getRandom(0, 1);
        let tmp2 = getRandom(0, 1);
        tmp === 1 ? iN++ : rN++;
        tmp2 === 1 ? aiN++ : arN++;
        if (iN === 2) {
          playerOP[count++] = { IR: "Remove", number: getRandom(1, 70) };
        } else if (rN === 2) {
          playerOP[count++] = { IR: "Insert", number: getRandom(1, 70) };
        } else {
          let title = tmp === 1 ? "Insert" : "Remove";
          playerOP[count++] = { IR: title, number: getRandom(1, 70) };
        }
        if (aiN === 2) {
          AIOP[aicount++] = {
            IR: "Remove",
            number: getRandom(1, 70),
            do: 0,
            time: getRandom(1, 9) * 1000,
          };
        } else if (arN === 2) {
          AIOP[aicount++] = {
            IR: "Insert",
            number: getRandom(1, 70),
            do: 0,
            time: getRandom(1, 9) * 1000,
          };
        } else {
          let title = tmp2 === 1 ? "Insert" : "Remove";
          AIOP[aicount++] = {
            IR: title,
            number: getRandom(1, 70),
            do: 0,
            time: getRandom(1, 9) * 1000,
          };
        }
      }
    }
    aicount = 0;
    for (let i = 0; i < type; i++) {
      let doArr = [1, 0, 0];
      doArr.sort(function () {
        return 0.5 - Math.random();
      });
      for (let j = 0; j < 3; j++) {
        AIOP[aicount++].do = doArr[j];
      }
    }
    change = 0;
  }

  console.log(AIOP);
  return (
    <div className="A3">
      <div className="AVLgame">
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
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>AVL</h1>
        <h2>Round {round}</h2>
        <div className="interactiveInterface">
          <Tilt className="gametitle" options={options}>
            <div className="playercontainer">
              <div className="namegrade">
                <div className="thegrade">{playergrade}</div>
                <h3>player</h3>
              </div>
              <div className="options">
                <Button
                  className="playerbtn1"
                  variant="outline-dark"
                  disabled={playerbtn1}
                  onClick={() => {
                    start();
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
                    for (let i = 0; i < 3; i++) {
                      if (AIOP[opArr[round - 1] + i].do === 1) {
                        if (AIOP[opArr[round - 1] + i].IR === "Insert") {
                          let executionOP = setInterval(() => {
                            console.log("insert");
                            insert(AIOP[opArr[round - 1] + i].number);
                            search(AIOP[opArr[round - 1] + i].number);
                            start();
                            setPlaybtn1(0);
                            setPlaybtn2(0);
                            setPlaybtn3(0);
                            setAigrade(aigrade + 5);
                            setRound(round + 1);
                            clearInterval(executionOP);
                          }, AIOP[opArr[round - 1] + i].time);
                        } else {
                          console.log("Remove");
                          let executionOP = setInterval(() => {
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
                              clearInterval(executionOP);
                              start();
                              setPlaybtn1(0);
                              setPlaybtn2(0);
                              setPlaybtn3(0);
                              setRound(round + 1);
                            } else {
                              setAigrade(aigrade - 3);
                              clearInterval(executionOP);
                              start();
                              setPlaybtn1(0);
                              setPlaybtn2(0);
                              setPlaybtn3(0);
                              setRound(round + 1);
                            }
                          }, AIOP[opArr[round - 1] + i].time);
                        }
                        break;
                      }
                    }
                  }}
                >
                  {playerOP[opArr[round - 1]].IR}
                  {playerOP[opArr[round - 1]].number}
                </Button>
                <Button
                  className="playerbtn2"
                  variant="outline-dark"
                  disabled={playerbtn2}
                  onClick={() => {
                    start();
                    setPlaybtn1(1);
                    setPlaybtn2(1);
                    setPlaybtn3(1);
                    for (let i = 0; i < 3; i++) {
                      if (AIOP[opArr[round - 1] + i].do === 1) {
                        if (AIOP[opArr[round - 1] + i].IR === "Insert") {
                          let executionOP = setInterval(() => {
                            console.log("insert");
                            insert(AIOP[opArr[round - 1] + i].number);
                            search(AIOP[opArr[round - 1] + i].number);
                            start();
                            setPlaybtn1(0);
                            setPlaybtn2(0);
                            setPlaybtn3(0);
                            setAigrade(aigrade + 5);
                            setRound(round + 1);
                            clearInterval(executionOP);
                          }, AIOP[opArr[round - 1] + i].time);
                        } else {
                          console.log("Remove");
                          let executionOP = setInterval(() => {
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
                              clearInterval(executionOP);
                              start();
                              setPlaybtn1(0);
                              setPlaybtn2(0);
                              setPlaybtn3(0);
                              setRound(round + 1);
                            } else {
                              setAigrade(aigrade - 3);
                              clearInterval(executionOP);
                              start();
                              setPlaybtn1(0);
                              setPlaybtn2(0);
                              setPlaybtn3(0);
                              setRound(round + 1);
                            }
                          }, AIOP[opArr[round - 1] + i].time);
                        }
                        break;
                      }
                    }
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
                  }}
                >
                  {playerOP[opArr[round - 1] + 1].IR}
                  {playerOP[opArr[round - 1] + 1].number}
                </Button>
                <Button
                  className="playerbtn3"
                  variant="outline-dark"
                  disabled={playerbtn3}
                  onClick={() => {
                    start();
                    setPlaybtn1(1);
                    setPlaybtn2(1);
                    setPlaybtn3(1);
                    for (let i = 0; i < 3; i++) {
                      if (AIOP[opArr[round - 1] + i].do === 1) {
                        if (AIOP[opArr[round - 1] + i].IR === "Insert") {
                          let executionOP = setInterval(() => {
                            console.log("insert");
                            insert(AIOP[opArr[round - 1] + i].number);
                            search(AIOP[opArr[round - 1] + i].number);
                            start();
                            setPlaybtn1(0);
                            setPlaybtn2(0);
                            setPlaybtn3(0);
                            setAigrade(aigrade + 5);
                            setRound(round + 1);
                            clearInterval(executionOP);
                          }, AIOP[opArr[round - 1] + i].time);
                        } else {
                          console.log("Remove");
                          let executionOP = setInterval(() => {
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
                              clearInterval(executionOP);
                              start();
                              setPlaybtn1(0);
                              setPlaybtn2(0);
                              setPlaybtn3(0);
                              setRound(round + 1);
                            } else {
                              setAigrade(aigrade - 3);
                              clearInterval(executionOP);
                              start();
                              setPlaybtn1(0);
                              setPlaybtn2(0);
                              setPlaybtn3(0);
                              setRound(round + 1);
                            }
                          }, AIOP[opArr[round - 1] + i].time);
                        }
                        break;
                      }
                    }
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
                  }}
                >
                  {playerOP[opArr[round - 1] + 2].IR}
                  {playerOP[opArr[round - 1] + 2].number}
                </Button>
              </div>
            </div>
          </Tilt>
          <div className="timer">3</div>
          <Tilt className="gametitle" options={options}>
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
                  {AIOP[opArr[round - 1]].IR} {AIOP[opArr[round - 1]].number}
                </Button>
                <Button
                  className="aibtn2"
                  variant="outline-dark"
                  disabled={true}
                >
                  {AIOP[opArr[round - 1] + 1].IR}
                  {AIOP[opArr[round - 1] + 1].number}
                </Button>
                <Button
                  className="aibtn3"
                  variant="outline-dark"
                  disabled={true}
                >
                  {AIOP[opArr[round - 1] + 2].IR}
                  {AIOP[opArr[round - 1] + 2].number}
                </Button>
              </div>
            </div>
          </Tilt>
        </div>
        <div>
          <Button
            className="startbtn"
            variant="outline-dark"
            style={{ marginTop: "20px" }}
            onClick={() => {
              firstStart();
              let btn = document.querySelector(".startbtn");
              btn.disabled = 1;
            }}
          >
            Start
          </Button>
          <Button
            variant="outline-dark"
            style={{ marginTop: "20px" }}
            onClick={() => setdiffcultyModalShow(true)}
          >
            Restart
          </Button>
        </div>
        <AVLTree data={arr} ref={ref} />
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <GameMyVerticallyCenteredModal
          show={gamemodalShow}
          onHide={() => setgameModalShow(false)}
        />
        <DifficultyMyVerticallyCenteredModal
          show={diffcultymodalShow}
          onHide={() => setdiffcultyModalShow(false)}
        />
      </div>
    </div>
  );
}

export default AVLGame;
