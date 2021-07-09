import React, { useState } from "react";
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
  YoutubeOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import FileUpload from "../components/file-upload/file-upload.component";
import server from "../apis/server";
import axios from "axios";

const Iconlist = () => {
  const [newfile, setNewFile] = useState({
    profileImages: [],
  });
  const [content, setContent] = useState({
    content: "",
    genre: ""
  })
  const [clickupload, setClickUpload] = useState(false);

  const handleClickUpload = (boolean) => {
    if (boolean) {
      setClickUpload(true);
    } else {
      setClickUpload(false);
    }
  };

  const updateUploadedFiles = (files) => setNewFile({ ...newfile, profileImages: files });
  const updateUploadedContents = (value, key) => {
    const state = {
      [key]: value
    };
    setContent((content) => {
      return {
        ...content,
        ...state
      }
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 여기에 이미지 올리는 로직 작성해야 함
    const media = [];

    for(let el of newfile.profileImages){
      const ext = el.name.split(".")[1];

      const url = await server.get("/upload")
      .then((res) => res.data.data);
      const path = url.split("?")[0];
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      await axios.put(url, el, config)
      .catch((err) => console.log(err));

      let obj;
      if(ext === "mp4"){
        obj = {
          type: "video",
          path
        };
      }else{
        obj = {
          type: "img",
          path
        };
      };
      media.push(obj);
    };

    handlePost(media);

  };

  const handlePost = async (media) => {
    const accessToken = window.localStorage.getItem("accessToken")
    const bodyData = {
      media,
      ...content
    };
    const headers = {
      authorization: `Bearer ${accessToken}`
    };
    await server.post("/post/create", bodyData, { headers })
    .then(() => {
      alert("포스트가 등록되었습니다");
      handleClickUpload(false);
    })
    .catch((err) => console.log(err));

  };

  return (
    <>
      <div className="leftSpace">
        <div className="iconList">
          <div className="spaceDirection">
            <div className="homeButton">
              <div className="homeButtonIcon">
                <Link to="/mainpage" className="noEffect">
                  <HomeOutlined className="realIcon" />
                </Link>
              </div>
              <Link className="noEffect" to="/mainpage">
                <div className="homeButtonText">Home</div>
              </Link>
            </div>

            <div className="homeButton">
              <div className="homeButtonIcon">
                <Link
                  className="noEffect"
                  onClick={() => handleClickUpload(true)}
                  to="/"
                >
                  <FileAddOutlined className="realIcon" />
                </Link>
              </div>
              <Link className="noEffect">
                <div
                  className="homeButtonText"
                  onClick={() => handleClickUpload(true)}
                  to="/"
                >
                  Post
                </div>
              </Link>
            </div>

            <div className="homeButton">
              <div className="homeButtonIcon">
                <Link className="noEffect" to="/mypage">
                  <UserOutlined className="realIcon" />
                </Link>
              </div>
              <Link className="noEffect" to="/mypage">
                <div className="homeButtonText">Mypage</div>
              </Link>
            </div>

            <div className="homeButton">
              <div className="homeButtonIcon">
                <Link className="noEffect" to="/mainpage">
                  <HeartOutlined className="realIcon" />
                </Link>
              </div>
              <Link className="noEffect" to="/mainpage">
                <div className="homeButtonText">Like</div>
              </Link>
            </div>
            <div className="likeButton"></div>
          </div>
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
                updateContentCb={updateUploadedContents}
                handleClickUpload={handleClickUpload}
              />
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Iconlist;
