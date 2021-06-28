import React from "react";
import Nav from "../components/Nav";
import Post from "../pages/Post";
import Mypage from "../pages/Mypage";
import '../mainpage.css';

const Mainpage = () => {
  return (
    <>
      <div className="blockhere">- </div>
      <div className="mainPage">
        <Nav />
        <div className="leftSpace"> </div>
        <div className="middleSpace"> 

          <div className="midContents">
            <a href='https://www.naver.com' target='_blank'> 
              <div className="user"> 
                송중기
              </div>
            </a>

            <button>게시물 작성 </button>
            <button>마이 페이지 </button>

            <img src="https://media.vlpt.us/images/iooi75/post/cb112766-1934-4282-87ed-9c6384afa7e8/image.png" alt=""
                  className="exampleIMG"
            />

          </div>
        </div>
        <div className="rightSpace"> </div>
      </div>
    </>
  );
};

export default Mainpage;
