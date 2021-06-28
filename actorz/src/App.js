import Nav from "./components/Nav";
import Intropage from "./pages/Intropage";
import Mainpage from "./pages/Mainpage";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Mypage from "./pages/Mypage";
import Post from "./pages/Posts";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Intropage} />
        <Switch>
          <Route path="/mainpage" component={Mainpage} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/posts" component={Post} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
