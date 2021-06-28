import React, { useState } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import Post from "../pages/Post";
import Mypage from "../pages/Mypage";
import MypageEdit from "./MypageEdit";
import FileUpload from "../components/file-upload/file-upload.component";
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { IdcardOutlined, HeartOutlined, FileAddOutlined, HomeOutlined, GithubOutlined, ToolOutlined, InstagramOutlined, FormOutlined, FacebookOutlined, YoutubeOutlined, VerticalAlignBottomOutlined, ArrowDownOutlined} from '@ant-design/icons';
import IntroNav from "../components/IntroNav";
import { Avatar } from '@material-ui/core';

import "../mainpage.css";

const Mainpage = () => {
  const [newfile, setNewFile] = useState({
    profileImages: [],
  });
  const [clickupload, setClickUpload] = useState(false);

  const handleClickUpload = (boolean) => {
    if (boolean) {
      setClickUpload(true);
    } else {
      setClickUpload(false);
    }
  };

  const updateUploadedFiles = (files) =>
    setNewFile({ ...newfile, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 이미지 올리는 로직 작성해야 함
  };

  return (
    <>

      <div className="blockhere"> </div>
      <div className="mainPage">
        <Nav />
        <div className="leftSpace"> 
          <div className="iconList">
            <div className="spaceDirection"> 
              <div className="homeButton">
                <div className="homeButtonIcon"> 
                  <Link className="noEffect" to="/mainpage">
                    <HomeOutlined className="realIcon"/>
                  </Link>
                </div>
                 <Link className="noEffect" to="/mainpage">
                  <div className="homeButtonText">
                      Home
                  </div>
                </Link>
              </div>

              <div className="homeButton">
                <div className="homeButtonIcon"> 
                  <Link className="noEffect" onClick={() => handleClickUpload(true)}>
                    <FileAddOutlined className="realIcon"/>
                  </Link>
                </div>
                 <Link className="noEffect">
                  <div className="homeButtonText" onClick={() => handleClickUpload(true)}>
                      Post
                  </div>
                </Link>
              </div>

              <div className="homeButton">
                <div className="homeButtonIcon"> 
                  <Link className="noEffect" to="/mypage" onClick={() => handleClickUpload(true)}>
                    <IdcardOutlined className="realIcon"/>
                  </Link>
                </div>
                 <Link className="noEffect" to="/mypage" onClick={() => handleClickUpload(true)}>
                  <div className="homeButtonText">
                      Mypage
                  </div>
                </Link>
              </div>

               <div className="homeButton">
                <div className="homeButtonIcon"> 
                  <Link className="noEffect" to="/mainpage">
                    <HeartOutlined className="realIcon"/>
                  </Link>
                </div>
                 <Link className="noEffect" to="/mainpage">
                  <div className="homeButtonText">
                      Like
                  </div>
                </Link>
              </div>
            
              <div className="likeButton"></div>
            </div>
          </div>
        </div>

        <div className="newblockPosition"> </div>

        <div className="middleSpace"> 
          <div className="midContents">
            <div className="midContentUpPart"> 
              <div>
                <Link to="post">
                  <Avatar className="exampleProfile" src="/broken-image.jpg" />
                </Link>
              </div>

              <div className="postNamePart">
                <Link to="post">
                  <div className="user">goyounjung</div>
                </Link>
              </div>
            </div>
            
            <div className="midContentDownPart">
              <img
                src="https://media.vlpt.us/images/iooi75/post/a0e76905-5ec8-4bcc-8d64-2db0a6e6e168/image.png"
                alt=""
                className="exampleIMG"
              />
            </div>
          </div>
        </div>
        <div className="newblockPosition2"> </div>

        <div className="rightSpace">  
          <div className="iconList2"> </div>
        </div>
      </div>
        
      <div id="Footer">
        <div className="footerUser1">
          <ToolOutlined className="footerIcon" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="footerName">김선들 |</span>
          <a href='https://github.com/SundeulDonaKim' target='_blank' className="alinkEffect2">
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@dandelion' target='_blank' className="alinkEffect2">
            <FormOutlined className="footerIcon" />
          </a>
          <InstagramOutlined className="footerIcon" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div className="footerUser2">
          <span className="footerName">이한빈 |</span>
          <a href='https://github.com/lhb7021' target='_blank' className="alinkEffect2">
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@lhb7021' target='_blank' className="alinkEffect2">
            <FormOutlined className="footerIcon" />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div className="footerUser3">
          <span className="footerName">유지원 |</span>
          <a href='https://github.com/jiweon21' target='_blank' className="alinkEffect2">
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@jiwon22' target='_blank' className="alinkEffect2">
            <FormOutlined className="footerIcon" />
          </a>
          <YoutubeOutlined className="footerIcon" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div className="footerUser4">
          <span className="footerName">임현택 |</span>
          <a href='https://github.com/Captainjack-kor' target='_blank' className="alinkEffect2">
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@iooi75' target='_blank' className="alinkEffect2">
            <FormOutlined className="footerIcon" />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>

      <div>
      {clickupload ? (
          <div>
            <form onSubmit={handleSubmit}>
              <FileUpload
                accept=".jpg,.png,.jpeg, .mp4"
                multiple
                updateFilesCb={updateUploadedFiles}
                handleClickUpload={handleClickUpload}
              />
            </form>
          </div>
        ) : null}
        </div>
    </>
  );
};

export default Mainpage;
