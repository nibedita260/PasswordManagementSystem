import React from "react";
import { Provider } from "react-redux";
import MainContainer from "./components/MainContainer";
import setAuthenticationToken from "./redux/action/setAuthenticationToken";
import store from "./redux/store";
import { setCurrentUser, logoutUser } from "./redux";
import "./App.css";
import jwt from "jsonwebtoken";

function App() {
  if (localStorage.jwtToken) {
    setAuthenticationToken(localStorage.jwtToken);
    //store.dispatch(setCurrentUser(localStorage.jwtToken));
    // store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
    jwt.verify(localStorage.jwtToken, "secret", function (err, decode) {
      if (err) {
        store.dispatch(logoutUser());
      } else {
        store.dispatch(setCurrentUser(decode));
      }
    });
  }

  return (
    <Provider store={store}>
      <div className="App">
        <MainContainer />
      </div>
    </Provider>
  );
}

export default App;
