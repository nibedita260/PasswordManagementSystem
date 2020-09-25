import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loginUser } from "../redux";

function LoginContainer(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container>
      <Row>
        <Col>
          <h1>Login</h1>
          <Form className="form">
            <p>{props.msg}</p>
            <Form.Group controlId="formSignup1">
              <Form.Label>Enter Username </Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.username}
                onChange={(e) => setUsername(e.target.value)}
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
            <p>
              <Link to="/signup">create new account?</Link>
              {/* <a href="/signup">create new account?</a> */}
            </p>
            <Button
              variant="primary"
              onClick={() => props.loginUser(username, password)}
            >
              Login
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
    password: state.user.password,
    msg: state.user.msg,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    loginUser: function (username, password) {
      dispatch(loginUser(username, password));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginContainer);
