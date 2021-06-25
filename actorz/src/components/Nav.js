import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

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
        <span className="title">Actorz</span>
        <div className="search">
          <input
            className="product-search"
            value={search}
            placeholder="찾고 싶은 상품을 입력하세요"
            onChange={e => inputHandler(e)}
          ></input>
          <button className="product-search-btn">검색</button>
        </div>
        <span>
          <button className="btn-nav" onClick={handleClickSignin}>로그인</button>
          <button className="btn-nav" onClick={handleClickSignup}>회원가입</button>
        </span>
        {clickSignin ? <Signin handleClickSignin={handleClickSignin} handleClickSignup={handleClickSignup} /> : <></>}
        {clickSignup ? <Signup handleClickSignin={handleClickSignin} handleClickSignup={handleClickSignup} /> : <></>}
      </div>
    </>
  );
};

export default Nav;