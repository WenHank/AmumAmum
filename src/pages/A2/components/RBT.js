import React from "react";
import { useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import { RedBlackTree, useRedBlackTree } from "react-tree-vis";
import { MDBContainer } from "mdbreact";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

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
      <Document file="/RedBlackTree.pdf" onLoadSuccess={onDoucumentLoadSuccess}>
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
          Red Black Tree
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
function InorderIntroduction(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Inorder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="traversal">
          <div>
            <h3>What is Inorder ?</h3>
            <p>
              簡單來說，中序地走訪規則為LDR，
              <br />
              且一般來說會使用
              <span style={{ color: "rgb(58 181 57)" }}>遞迴</span>的方式來執行
              <br />
              L代表走訪左子樹
              <br />
              D代表印出該Node的數值
              <br />
              R代表走訪右子數
              <br />
              以下圖為例
              <br />
            </p>
            <img src="/Img/traversal.png" />
          </div>
          <div>
            <span style={{ color: "#4874b1" }}>走訪順序為：</span>
            <br />
            L(Node 4 有左子樹)
            <br />
            L(Node 5 有左子樹)
            <br />
            L(Node 2 沒左子樹)
            <br />
            D(Node 2 印出2)
            <br />
            R(Node 2 沒右子樹)
            <br />
            D(Node 5 印出5)
            <br />
            R(Node 5 有右子樹)
            <br />
            L(Node 1 沒左子樹)
            <br />
            D(Node 1 印出1)
            <br />
            R(Node 1 沒右子樹)
            <br />
            D(Node 4 印出4)
            <br />
            R(Node 4 有右子樹)
            <br />
            L(Node 3 沒左子樹)
            <br />
            D(Node 3 印出3)
            <br />
            R(Node 3 有右子樹)
            <br />
            L(Node 6 沒左子樹)
            <br />
            D(Node 6 印出6)
            <br />
            R(Node 3 沒右子樹)
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function PreorderIntroduction(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Preorder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="traversal">
          <div>
            <h3>What is Preorder ?</h3>
            <p>
              簡單來說，前序地走訪規則為DLR，
              <br />
              且一般來說會使用
              <span style={{ color: "rgb(58 181 57)" }}>遞迴</span>的方式來執行
              <br />
              D代表印出該Node的數值
              <br />
              L代表走訪左子樹
              <br />
              R代表走訪右子數
              <br />
              以下圖為例
              <br />
            </p>
            <img src="/Img/traversal.png" />
          </div>
          <div>
            <span style={{ color: "#4874b1" }}>走訪順序為：</span>
            <br />
            D(Node 4 印出4)
            <br />
            L(Node 4 有左子樹)
            <br />
            D(Node 5 印出5)
            <br />
            L(Node 5 有左子樹)
            <br />
            D(Node 2 印出2)
            <br />
            L(Node 2 沒左子樹)
            <br />
            R(Node 2 沒右子樹)
            <br />
            R(Node 5 有右子樹)
            <br />
            D(Node 1 印出1)
            <br />
            L(Node 1 沒左子樹)
            <br />
            R(Node 1 沒右子樹)
            <br />
            R(Node 4 有右子樹)
            <br />
            D(Node 3 印出3)
            <br />
            L(Node 3 沒左子樹)
            <br />
            R(Node 3 有右子樹)
            <br />
            D(Node 6 印出6)
            <br />
            L(Node 6 沒左子樹)
            <br />
            R(Node 6 沒右子樹)
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function PostorderIntroduction(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Postorder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="traversal">
          <div>
            <h3>What is Inorder ?</h3>
            <p>
              簡單來說，中序地走訪規則為LDR，
              <br />
              且一般來說會使用
              <span style={{ color: "rgb(58 181 57)" }}>遞迴</span>的方式來執行
              <br />
              L代表走訪左子樹
              <br />
              R代表走訪右子數
              <br />
              D代表印出該Node的數值
              <br />
              以下圖為例
              <br />
            </p>
            <img src="/Img/traversal.png" />
          </div>
          <div>
            <span style={{ color: "#4874b1" }}>走訪順序為：</span>
            <br />
            L(Node 4 有左子樹)
            <br />
            L(Node 5 有左子樹)
            <br />
            L(Node 2 沒左子樹)
            <br />
            R(Node 2 沒右子樹)
            <br />
            D(Node 2 印出2)
            <br />
            R(Node 5 有右子樹)
            <br />
            L(Node 1 沒左子樹)
            <br />
            R(Node 1 沒右子樹)
            <br />
            D(Node 1 印出1)
            <br />
            R(Node 4 有右子樹)
            <br />
            L(Node 3 沒左子樹)
            <br />
            R(Node 3 有右子樹)
            <br />
            L(Node 6 沒左子樹)
            <br />
            R(Node 6 有右子樹)
            <br />
            D(Node 6 印出6)
            <br />
            D(Node 3 印出3)
            <br />
            D(Node 4 印出4)
            <br />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function Traversal(orderValue) {
  let print = orderValue[0];
  for (let i = 1; i < orderValue.length; i++) {
    print += "->";
    print += orderValue[i];
  }
  return print;
}
function RBT() {
  const { ref, insert, remove, getData, search, clear, generateRandomTree } =
    useRedBlackTree();
  const [rbtinsertValue, setrbtInsertValue] = useState(0);
  const [rbtremoveValue, setrbtRemoveValue] = useState(0);
  const [rbtsearchValue, setrbtsearchValue] = useState(0);
  const [InorderValue, setInorderValue] = useState("");
  const [PreorderValue, setPreorderValue] = useState("");
  const [PostorderValue, setPostorderValue] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [inordermodalShow, setinorderModalShow] = React.useState(false);
  const [preordermodalShow, setpreorderModalShow] = React.useState(false);
  const [postordermodalShow, setpostorderModalShow] = React.useState(false);
  const [record, setRecord] = useState([]);
  const scrollContainerStyle = { width: "100%", maxHeight: "500px" };
  const [open, setOpen] = useState("hide");

  let tmp = [...record];
  return (
    <div className="A2">
      <div className="rbt">
        <div className="hintContainer">
          <div className="loader"></div>
          <img
            className="hint"
            src="/Img/hint.gif"
            onClick={() => setModalShow(true)}
          />
        </div>
        <h1>Red Black Tree</h1>
        <div className="Input">
          <div className="InputGroup">
            <Button
              variant="outline-dark"
              onClick={() => {
                generateRandomTree(getRandom(5, 10));
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {"Random \n"}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgb(155, 155, 155)",
                        }}
                      >
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
              }}
            >
              Random
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => {
                clear();
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {"Clear \n"}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgb(155, 155, 155)",
                        }}
                      >
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
              }}
            >
              Clear
            </Button>
          </div>
          <div className="InputGroup">
            <input
              type="number"
              onChange={(elem) =>
                setrbtsearchValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="outline-dark"
              onClick={() => {
                search(rbtsearchValue);
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {`Search  ${rbtsearchValue} \n`}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgb(155, 155, 155)",
                        }}
                      >
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
              }}
            >
              Search
            </Button>
            <input
              type="number"
              onChange={(elem) =>
                setrbtInsertValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="outline-dark"
              onClick={() => {
                insert(rbtinsertValue);
                search(rbtinsertValue);
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {`Insert  ${rbtinsertValue} \n`}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgb(155, 155, 155)",
                        }}
                      >
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
              }}
            >
              Insert
            </Button>
            <input
              type="number"
              onChange={(elem) =>
                setrbtRemoveValue(parseInt(elem.currentTarget.value, 10))
              }
            />
            <Button
              variant="outline-dark"
              onClick={() => {
                search(rbtremoveValue);
                setTimeout(() => {
                  remove(rbtremoveValue);
                }, 1200);
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {`Remove  ${rbtremoveValue} \n`}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgb(155, 155, 155)",
                        }}
                      >
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
              }}
            >
              Remove
            </Button>
          </div>
          <div className="InputGroup">
            <div className="Inorder">
              <img
                className="hint"
                src="/Img/hint.gif"
                onClick={() => setinorderModalShow(true)}
              />
            </div>
            <Button
              variant="outline-dark"
              onClick={() => {
                let orderValue = getData("inorder");
                setInorderValue(getData("inorder"));
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {`Inorder \n`}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgb(155, 155, 155)",
                        }}
                      >
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
                let i = 0;
                let Inordertraversal = setInterval(() => {
                  if (i > orderValue.length) {
                    clearInterval(Inordertraversal);
                  }
                  search(parseInt(orderValue[i]));
                  i++;
                }, 800);
              }}
            >
              Inorder
            </Button>
            <div className="showTraversal">{Traversal(InorderValue)}</div>
          </div>
          <div className="InputGroup">
            <div className="Inorder">
              <img
                className="hint"
                src="/Img/hint.gif"
                onClick={() => setpreorderModalShow(true)}
              />
            </div>
            <Button
              variant="outline-dark"
              onClick={() => {
                let orderValue = getData("preorder");
                setPreorderValue(getData("preorder"));
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {`Preorder \n`}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgb(155, 155, 155)",
                        }}
                      >
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
                let i = 0;
                let Preordertraversal = setInterval(() => {
                  if (i > orderValue.length) {
                    clearInterval(Preordertraversal);
                  }
                  search(parseInt(orderValue[i]));
                  i++;
                }, 800);
              }}
            >
              Preorder
            </Button>
            <div className="showTraversal">{Traversal(PreorderValue)}</div>
          </div>
          <div className="InputGroup">
            <div className="Inorder">
              <img
                className="hint"
                src="/Img/hint.gif"
                onClick={() => setpostorderModalShow(true)}
              />
            </div>
            <Button
              variant="outline-dark"
              onClick={() => {
                let orderValue = getData("postorder");
                setPostorderValue(getData("postorder"));
                setRecord((prevArray) => [
                  ...record,
                  <div>
                    <p className="recordP">
                      {`Postorder \n`}
                      <span
                        style={{
                          fontSize: "10px",
                          color: "rgb(155, 155, 155)",
                        }}
                      >
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
                let i = 0;
                let Postordertraversal = setInterval(() => {
                  if (i > orderValue.length) {
                    clearInterval(Postordertraversal);
                  }
                  search(parseInt(orderValue[i]));
                  i++;
                }, 800);
              }}
            >
              Postorder
            </Button>
            <div className="showTraversal">{Traversal(PostorderValue)}</div>
          </div>
        </div>
        <div className={`record ${open === "show" && "open"} `}>
          <div className="recordContainer">
            <Button
              variant="outline-dark"
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
                <div className="title">Record Table</div>
                {tmp.reverse()}
              </div>
            </MDBContainer>
          </div>
        </div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <InorderIntroduction
          show={inordermodalShow}
          onHide={() => setinorderModalShow(false)}
        />
        <PreorderIntroduction
          show={preordermodalShow}
          onHide={() => setpreorderModalShow(false)}
        />
        <PostorderIntroduction
          show={postordermodalShow}
          onHide={() => setpostorderModalShow(false)}
        />
        <RedBlackTree data={arr} ref={ref} />
      </div>
    </div>
  );
}

export default RBT;
