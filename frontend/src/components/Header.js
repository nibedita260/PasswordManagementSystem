import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/action/userAction";
import UserProfile from "./UserProfile";

function Header(props) {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Password Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <Link to="#" className="dropdown-item" role="button">
                Add New Password Category
              </Link>
              <a to="#" className="dropdown-item" role="button">
                View All Passwrd Category
              </a>
            </NavDropdown>
            <NavDropdown title="Passowrd" id="basic-nav-dropdown">
              <Link to="#" className="dropdown-item" role="button">
                Add New Password
              </Link>
              <Link to="#" className="dropdown-item" role="button">
                View All Passwrd
              </Link>
            </NavDropdown>
            <NavDropdown
              title={props.userDetails.username}
              id="basic-nav-dropdown"
            >
              <Link to="/userprofile" className="dropdown-item" role="button">
                View Profile
              </Link>
              <Link
                to="/"
                className="dropdown-item"
                role="button"
                onClick={() => props.logout()}
              >
                Logout
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route path="/userprofile" component={UserProfile} />
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    userDetails: state.user.userDetails,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    logout: function () {
      dispatch(logoutUser());
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Header);
//export default Header;
