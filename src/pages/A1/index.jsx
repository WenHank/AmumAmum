import React from "react";
import { Nav, Navbar,NavDropdown, Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Tree from "./components/Treedocument";
import BST from "./components/BSTdocument";
import AVL from "./components/AVLdocument";
import RBT from "./components/RBTdocument";
import Grade from "../Grade/components/Grade";

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
                    href="https://forms.gle/8ScmAyEciVQ9oLYB6"
                    target="_blank"
                    variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                    id="A1_Test"
                  >
                    BST Test
                  </Button>
                  <Button
                    href="https://forms.gle/rC5MwrhMfi7yFGbr5"
                    target="_blank"
                    variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}

                    id="A1_Test"
                  >
                    AVL Test
                  </Button>
                  <Button
                    href="https://forms.gle/QzkMeAjmp1F1Sngc7"
                    target="_blank"
                    variant="light"
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      width: "100%",
                    }}
                    id="A1_Test"
                  >
                    RBT Test
                  </Button>
                   <Button
                    href="https://forms.gle/SQc3WPkFbmaEtG9KA"
                    target="_blank"
                    variant="light"
                    style={{
                      textDecoration: "none",
                      marginRight: "20px",
                      width: "100%",
                    }}
                    id="A1_Test"
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
