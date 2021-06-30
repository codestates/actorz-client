import React, { useState } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import FileUpload from "../components/file-upload/file-upload.component";
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import IntroNav from "../components/IntroNav";
import { Avatar } from '@material-ui/core';
import Iconlist from '../components/Iconlist';
import Footer from '../components/Footer';
import "../mainpage.css";
import {
  UserOutlined,
  IdcardOutlined,
  HeartOutlined,
  FileAddOutlined,
  HomeOutlined,
  GithubOutlined,
  ToolOutlined,
  InstagramOutlined,
  FormOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  VerticalAlignBottomOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

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
        <Iconlist />


        <div className="newblockPosition"> </div>

        <div className="middleSpace">
          <div className="midContents">
            <div className="midContentUpPart">
              <div>
                <Link to="posts">
                  <Avatar className="exampleProfile" src="/broken-image.jpg" />
                </Link>
              </div>

              <div className="postNamePart">
                <Link to="posts">
                  <div className="user">goyounjung</div>
                </Link>
              </div>
            </div>

            <div className="midContentDownPart">
              <div className="effecTest">
                <a href="/mainpage">
                  <div className="screen">
                    <div className="top"> 고윤정 테스트</div>
                    <div className="bottom">
                      <HeartOutlined className="testIcon" />
                    </div>
                    <img
                      src="https://media.vlpt.us/images/iooi75/post/a0e76905-5ec8-4bcc-8d64-2db0a6e6e168/image.png"
                      alt=""
                      className="exampleIMG"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="newblockPosition2"> </div>

        <div className="rightSpace">
          <div className="iconList2"> </div>
        </div>
      </div>
      <Footer />

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
