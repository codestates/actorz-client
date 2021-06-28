import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import 'antd/dist/antd.css';
import { Button } from 'antd';

const IntroNav = () => {
  const [clickSignin, setClickSignin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);

  const handleClickSignin = () => {
    setClickSignup(false);
    if (clickSignin) {
      setClickSignin(false);
    } else {
      setClickSignin(true);
    }
  };

  const handleClickSignup = () => {
    setClickSignin(false);
    if (clickSignup) {
      setClickSignup(false);
    } else {
      setClickSignup(true);
    }
  };

  return (
    <>
      <div id="nav">
        <span className="title">Actorz</span>

        <div className="introNavbar">
          <div>
            <a href='https://www.naver.com' target='_blank'>
              <img src="https://media.vlpt.us/images/iooi75/post/4f4baec2-cb29-4b8b-b2ea-892cef41febc/Screen%20Shot%202021-06-22%20at%209.56.14%20PM.png" className="headerLogo" />
            </a>
          </div>
          <div className="blockPositionNav"> </div>
          <div className="signBtnPosition">
            <Button variant="outlined"
              className="navSignInBtn" onClick={handleClickSignin}>Sign in</Button>
            &nbsp;
            <Button variant="outlined"
              className="navSignInBtn" onClick={handleClickSignup}>Sign up</Button>
          </div>
        </div>

        {clickSignin ? <Signin handleClickSignin={handleClickSignin} handleClickSignup={handleClickSignup} /> : <></>}
        {clickSignup ? <Signup handleClickSignin={handleClickSignin} handleClickSignup={handleClickSignup} /> : <></>}
      </div>
    </>
  );
};

export default IntroNav;