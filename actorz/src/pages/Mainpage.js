import React from "react";
import Nav from "../components/Nav";
import Post from "../pages/Post";
import Mypage from "../pages/Mypage";
import MypageEdit from "./MypageEdit";
import FileUpload from "../components/file-upload/file-upload.component";
import '../mainpage.css';

const Mainpage = () => {
  return (
    <>

      <div className="blockhere"> </div>
      <div className="mainPage">
        <Nav />
        <div className="leftSpace"> 
          <div className="iconList"> 
          </div>
        </div>

        <div className="newblockPosition"> </div>

        <div className="middleSpace"> 
          <div className="midContents">
            <img src="https://media.vlpt.us/images/iooi75/post/cb112766-1934-4282-87ed-9c6384afa7e8/image.png" alt=""
                  className="exampleIMG"
            />
          </div>
        </div>
        <div className="newblockPosition2"> </div>

        <div className="rightSpace"> 
          <div className="iconList2">
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Mainpage;
