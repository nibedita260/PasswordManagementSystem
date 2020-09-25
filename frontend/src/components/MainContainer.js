import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PassCatContainer from "./PassCatContainer";
import SignupContainer from "./SignupContainer";
import LoginContainer from "./LoginContainer";
import Header from "./Header";

function MainContainer(props) {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn); //for combine reducers
  if (isUserLoggedIn === false) {
    var callContainer = (
      <>
        <Route exact path="/" component={LoginContainer} />
        <Route path="/signup" component={SignupContainer} />
      </>
    );
  } else {
    var callContainer = (
      <>
        <Header />
        <Route exact path="/" component={PassCatContainer} />
      </>
    );
  }

  return <Router>{callContainer}</Router>;
}

export default MainContainer;
