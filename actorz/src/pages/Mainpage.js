import React from "react";
import Nav from "../components/Nav";
import "../mainpage.css";
import Post from "../pages/Post";
import Mypage from "../pages/Mypage";
import MypageEdit from "./MypageEdit";

const Mainpage = () => {
  return (
    <>
      {/* <Nav />
      <div>메인페이지</div> */}
      <Mypage />
    </>
  );
};

export default Mainpage;
