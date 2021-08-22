import React, { useState } from "react";
import { getAllPostInfo } from "../actions/postAction";
import { useDispatch } from "react-redux";
import {
  UserOutlined,
  HeartOutlined,
  FileAddOutlined,
  HomeOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../styles/Iconlist.css";
import { Link } from "react-router-dom";
import FileUpload from "../components/file-upload/file-upload.component";
import server from "../apis/server";
import axios from "axios";
import { Modal } from "antd";

const Iconlist = () => {
  const [clickupload, setClickUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newfile, setNewFile] = useState({
    profileImages: [],
  });
  const [content, setContent] = useState({
    content: "",
    genre: "",
  });
  const dispatch = useDispatch();

  const handleClickUpload = (boolean) => {
    if (boolean) {
      setClickUpload(true);
    } else {
      setClickUpload(false);
    }
  };

  const updateUploadedFiles = (files) =>
    setNewFile({ ...newfile, profileImages: files });
  const updateUploadedContents = (value, key) => {
    const state = {
      [key]: value,
    };
    setContent((content) => {
      return {
        ...content,
        ...state,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!content.genre) {
      Modal.warning({
        getContainer: document.getElementById("upload-modal-container"),
        content: "장르를 선택해 주세요",
      });
    } else {
      setIsLoading(true);
      const media = [];

      for (let el of newfile.profileImages) {
        const ext = el.name.split(".")[1];
        const url = await server.get("/upload").then((res) => res.data.data);
        const path = url.split("?")[0];
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        await axios.put(url, el, config).catch((err) => {
          throw err;
        });

        let obj;
        if (ext === "mp4") {
          obj = {
            type: "video",
            path,
          };
        } else {
          obj = {
            type: "img",
            path,
          };
        }
        media.push(obj);
      }

      handlePost(media);
    }
  };

  const handlePost = async (media) => {
    const accessToken = window.localStorage.getItem("accessToken");
    const bodyData = {
      media,
      ...content,
    };
    const headers = {
      authorization: `Bearer ${accessToken}`,
    };

    await server
      .post("/post/create", bodyData, { headers })
      .then(() => {
        setIsLoading(false);
        Modal.success({
          getContainer: document.getElementById("upload-modal-container"),
          content: "포스트가 등록되었습니다",
        });
        redirectPage();
      })
      .catch((err) => {
        throw err;
      });
  };

  const redirectPage = () => {
    window.location = "/mainpage";
  };

  const handleClickHomeBtn = async () => {
    try {
      await server.get(`post/search?name=&content=&age=`).then((res) => {
        dispatch(getAllPostInfo(res.data.data));
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="leftSpace">
        <div className="iconList">
          <div className="spaceDirection">
            <div className="homeButton">
              <div className="homeButtonIcon">
                <Link className="noEffect" to="/mainpage">
                  <HomeOutlined
                    className="realIcon"
                    onClick={handleClickHomeBtn}
                  />
                </Link>
              </div>
              <Link className="noEffect" to="/mainpage">
                <div className="homeButtonText" onClick={handleClickHomeBtn}>
                  Home
                </div>
              </Link>
            </div>

            <div className="homeButton" onClick={() => handleClickUpload(true)}>
              <div className="homeButtonIcon">
                <Link className="noEffect" to={`/mainpage`}>
                  <FileAddOutlined className="realIcon" />
                </Link>
              </div>
              <Link className="noEffect" to={`/mainpage`}>
                <div className="homeButtonText">Post</div>
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
                <Link className="noEffect" to="/like">
                  <HeartOutlined className="realIcon" />
                </Link>
              </div>
              <Link className="noEffect" to="/like">
                <div className="homeButtonText">Like</div>
              </Link>
            </div>

            <div className="homeButton">
              <div className="homeButtonIcon">
                <Link className="noEffect" to="/portfolio">
                  <SnippetsOutlined className="realIcon" />
                </Link>
              </div>
              <Link className="noEffect" to="/portfolio">
                <div className="homeButtonText">Portfolio</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        {clickupload ? (
          <div>
            <form onSubmit={handleSubmit}>
              <FileUpload
                accept="*"
                multiple
                updateFilesCb={updateUploadedFiles}
                updateContentCb={updateUploadedContents}
                handleClickUpload={handleClickUpload}
                isLoading={isLoading}
              />
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Iconlist;
