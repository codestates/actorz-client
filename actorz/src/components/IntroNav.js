import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

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

  const mvMainpage = () => {
    return (window.location = "/mainpage");
  };

  return (
    <>
      <div id="nav">
        <div className="introNavbar">
          <div>
            <Link to="/">
              <img
                src="https://media.vlpt.us/images/iooi75/post/4f4baec2-cb29-4b8b-b2ea-892cef41febc/Screen%20Shot%202021-06-22%20at%209.56.14%20PM.png"
                className="headerLogo"
                alt="headerLogo"
              />
            </Link>
          </div>

          <div className="signBtnPosition">
            <ul>
              <li className="nav-item">
                <a href="/mainpage" className="nav-link">
                  메인페이지
                </a>
              </li>
            </ul>
          </div>
        </div>

        {clickSignin ? (
          <Signin
            handleClickSignin={handleClickSignin}
            handleClickSignup={handleClickSignup}
          />
        ) : (
          <></>
        )}
        {clickSignup ? (
          <Signup
            handleClickSignin={handleClickSignin}
            handleClickSignup={handleClickSignup}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default IntroNav;
