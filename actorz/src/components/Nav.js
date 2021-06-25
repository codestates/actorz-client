import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Button } from 'antd';

const Nav = () => {
  const [search, setSearch] = useState("");

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };

  const handleClickSignin = () => {
    console.log("로그인 모달창");
  };

  const handleClickSignup = () => {
    console.log("회원가입 모달창");
  };

  return (
    <>
      <div id="nav">
        <div className="search">
          <img src="https://media.vlpt.us/images/iooi75/post/4f4baec2-cb29-4b8b-b2ea-892cef41febc/Screen%20Shot%202021-06-22%20at%209.56.14%20PM.png" className="headerLogo"/>
          
          <input className="product-search"
            value={search}
            placeholder="search ..."
            onChange={e => inputHandler(e)}
          ></input>

          <Button variant="outlined" className="product-search-btn">검색</Button>

          <span className="signBtnPosition">
            <Button variant="outlined" 
            className="navSignInBtn" onClick={handleClickSignin}>Sign in</Button>
              &nbsp;
            <Button variant="outlined" 
            className="navSignInBtn" onClick={handleClickSignup}>Sign up</Button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Nav;