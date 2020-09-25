import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signupUser } from "../redux";

function SignupContainer(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  return (
    <Container>
      <Row>
        <Col>
          <h1>Signup</h1>
          <Form className="form">
            <p>{props.msg}</p>
            <Form.Group>
              <Form.Label>Enter Username </Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Email </Form.Label>
              <Form.Control
                type="email"
                defaultValue={props.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Password </Form.Label>
              <Form.Control
                type="password"
                defaultValue={props.password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Confirm Password </Form.Label>
              <Form.Control
                type="password"
                defaultValue={props.confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </Form.Group>
            <p>
              <Link to="/">Already have an account?Login</Link>
              {/* <a href="/">Already have an account?Login</a> */}
            </p>
            <Button
              variant="primary"
              onClick={() =>
                props.signupUser(username, email, password, confirmpassword)
              }
            >
              SIGNUP
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

const mapStatetoProps = (state) => {
  return {
    username: state.user.username,
    email: state.user.email,
    password: state.user.password,
    confirmpassword: state.user.confirmpassword,
    msg: state.user.msg,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    signupUser: function (username, email, password, confirmpassword) {
      dispatch(signupUser(username, email, password, confirmpassword));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SignupContainer);
