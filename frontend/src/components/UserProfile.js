import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DefaultProfileImage from "../upload/default.png";
const axios = require("axios");

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      username: this.props.username,
      email: this.props.email,
      profileImage: this.props.profileImage,
      msg: this.props.msg,
      uploadedProfile: null,
    };
  }

  fetchUserDetails = (user_id) => {
    console.log(user_id);
    axios
      .get("http://localhost:5000/userapi/getUserDetails/" + user_id, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({ email: res.data.results[0].email });
        this.setState({ profileImage: res.data.results[0].profileImage });
      })
      .catch((err) => console.log(err));
  };

  changeProfileImage = (event) => {
    console.log(event.target.files[0]);
    this.setState({ uploadedProfile: event.target.files[0] });
  };

  UpdateProfileHandler = (e) => {
    e.preventDefault();
    //create object of form data
    const formData = new FormData();
    formData.append("profileImage", this.state.uploadedProfile);
    formData.append("user_id", this.state.user_id);
    //update-profile
    axios
      .post("http://localhost:5000/userapi/updateProfile/", formData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({ msg: res.data.message });
        this.setState({ profileImage: res.data.results.profileImage });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchUserDetails(this.state.user_id);
  }

  render() {
    if (this.state.profileImage) {
      var profileImg = this.state.profileImage;
      profileImg = profileImg.replace("public/", "");
      var profilePic = "http://localhost:5000/" + profileImg;
    } else {
      profilePic = DefaultProfileImage;
    }
    return (
      <Container>
        <Row>
          <Col>
            <h1>Profile Image</h1>
            <img
              src={profilePic}
              alt="defaultprofileimg"
              width="300"
              height="300"
            />
          </Col>
          <Col>
            <h1>User profile</h1>
            <Form className="form">
              <p>{this.state.msg}</p>
              <Form.Group>
                <Form.Label>Username </Form.Label>
                <Form.Control type="text" defaultValue={this.state.username} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter Email </Form.Label>
                <Form.Control type="email" defaultValue={this.state.email} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Profile Image </Form.Label>
                <Form.Control
                  type="file"
                  name="profileImage"
                  onChange={this.changeProfileImage}
                />
              </Form.Group>

              <Button variant="primary" onClick={this.UpdateProfileHandler}>
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    user_id: state.user.userDetails.userid,
    username: state.user.userDetails.username,
    email: state.user.userDetails.email,
    profileImage: state.user.userDetails.profileImage,
    msg: state.user.msg,
  };
};
export default connect(mapStatetoProps)(UserProfile);
