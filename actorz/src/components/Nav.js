import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Nav = () => {
  const [search, setSearch] = useState("");
  const [clickSignin, setClickSignin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };

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
        <div className="search">
          <div>
            <Link to="/mainpage">
              <img
                src="https://media.vlpt.us/images/iooi75/post/f8c2abf6-7870-4347-b971-2a4b5a5ecdc5/Screen%20Shot%202021-06-28%20at%203.13.02%20PM.png"
                className="headerLogo"
              />
            </Link>
          </div>

          <div className="blackNav"> </div>

          <div className="searchTotalNav">
            <input
              className="product-search"
              value={search}
              placeholder="  search..."
              onChange={(e) => inputHandler(e)}
            ></input>
            <Button variant="outlined" className="product-search-btn">
              검색
            </Button>
          </div>

          <div className="blackNav2"> </div>

          {}
            <div className="signBtnPosition">
              <Button
                variant="outlined"
                className="navSignInBtn"
                onClick={handleClickSignin}
              >
                Sign in
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                className="navSignInBtn"
                onClick={handleClickSignup}
              >
                Sign up
              </Button>
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

export default Nav;
