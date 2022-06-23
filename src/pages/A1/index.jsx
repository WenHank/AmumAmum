import React from "react";
import { Nav, Navbar,NavDropdown, Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Tree from "./components/Treedocument";
import BST from "./components/BSTdocument";
import AVL from "./components/AVLdocument";
import RBT from "./components/RBTdocument";
import Grade from "../Grade/components/Grade";


function BSTTEST(params) {
  return(
    <div className="testContainer">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfQiQz29af9rDxC0XJw65MTlgGa0ARVTRVYK8L6I95IQZv8Hw/viewform?embedded=true" width="640" height="4091" frameBorder="0" marginHeight="0" marginWidth="0">載入中…</iframe>
    </div>
  )
}
function AVLTEST(params) {
  return(
    <div className="testContainer">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeOS0jLLO6VG-Gb9XUJ73rMhr8qBBk5DoCj3XmdSJVxbWA1Yw/viewform?embedded=true" width="640" height="4091" frameBorder="0" marginHeight="0" marginWidth="0">載入中…</iframe>
    </div>
  )
}
function RBTTEST(params) {
  return(
    <div className="testContainer">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd6BogVec0_Fnkit5c-oZOiTzXn8e7480LzbM-cdezgeOMi8g/viewform?embedded=true" width="640" height="4091" frameBorder="0" marginHeight="0" marginWidth="0">載入中…</iframe>
    </div>
  )
}
function MIXEDTEST(params) {
  return(
    <div className="testContainer">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd6e6BWDc7ePfG_5hgO3SzLOq6at3_WawwnGlIjkQdQgu9rtg/viewform?embedded=true" width="640" height="4091" frameBorder="0" marginHeight="0" marginWidth="0">載入中…</iframe>
    </div>
  )
}
class A1 extends React.Component{
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
  render() {
    return (
      <div className="A3">
        <div>
          <Navbar expand="lg" variant="light" sticky="top" className="Header">
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
                }}
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
                }}
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
                  <NavDropdown
                title="Test"
                id="basic-nav-dropdown"
                style={{marginRight:"20px"}}
              >
                 <Button
                    variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                    id="A3_Test"
                    onClick={()=>{
                      this.handle(<BSTTEST />);
                    }}
                  >
                    BST Test
                  </Button>
                  <Button
                    onClick={()=>{
                      this.handle(<AVLTEST />);
                    }}
                    variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                    id="A3_Test"
                  >
                    AVL Test
                  </Button>
                  <Button
                     onClick={()=>{
                      this.handle(<RBTTEST />);
                    }}
                    variant="light"
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      width: "100%",
                    }}
                    id="A3_Test"
                  >
                    RBT Test
                  </Button>
                   <Button
                    onClick={()=>{
                      this.handle(<MIXEDTEST />);
                    }}
                    variant="light"
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      width: "100%",
                    }}
                    id="A3_Test"
                  >
                    Mixed Test
                  </Button>
                  </NavDropdown>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      this.handle(<Grade />);
                    }}
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    id="305"
                  >
                    Grade
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
      </div>
    );
  }
}

export default A1;
