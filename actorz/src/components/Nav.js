import React, { useState } from "react";

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
      </div>
    </>
  );
};

export default Nav;