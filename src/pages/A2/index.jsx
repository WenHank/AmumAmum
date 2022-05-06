import React from "react";
import { Nav, Navbar,NavDropdown, Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Home from "./components/Home";
import Tree from "./components/Treedocument";
import BST from "./components/BST";
import BSTInteractive from "./components/BSTInteractive";
import AVL from "./components/AVL";
import AVLInteractive from "./components/AVLInteractive";
import RBT from "./components/RBT";


class A2 extends React.Component{
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
                  <NavDropdown title="Binary Search Tree" id="basic-nav-dropdown">
                  <Button
                   onClick={() => {
                    this.handle(<BST />);
                  }}
                  variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                >
                  demonstrate
                </Button>
                <Button
                  onClick={() => {
                    this.handle(<BSTInteractive />);
                  }}
                  variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                >
                  Interactive
                </Button>
                  </NavDropdown>
              <NavDropdown
                title=" Adelson Velsky Landis Tree"
                id="basic-nav-dropdown"
              >
                <Button
                  onClick={() => {
                    this.handle(<AVL />);
                  }}
                  variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                >
                  demonstrate
                </Button>
                <Button
                  onClick={() => {
                    this.handle(<AVLInteractive />);
                  }}
                  variant="light"
                  style={{
                    textDecoration: "none",
                    marginRight: "20px",
                    width: "100%",
                  }}
                >
                  Interactive
                </Button>
              </NavDropdown>
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
                    href="https://forms.gle/SQc3WPkFbmaEtG9KA"
                    target="_blank"
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
      </div>
    );
  }
}

export default A2;
