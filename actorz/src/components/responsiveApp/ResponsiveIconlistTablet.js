import React, { useState } from "react";
import { getAllPostInfo } from "../../actions/postAction";
import { useDispatch } from "react-redux";
import {
  UserOutlined,
  HeartOutlined,
  FileAddOutlined,
  HomeOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import FileUpload from "../file-upload/file-upload.component";
import server from "../../apis/server";
import axios from "axios";
import { Modal } from "antd";
import "../../styles/ResponsiveIconlist.css";

const ResponsiveIconlistTablet = () => {
  const [clickupload, setClickUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [newfile, setNewFile] = useState({
    profileImages: [],
  });
  const [content, setContent] = useState({
    content: "",
    genre: "",
  });

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
    if (!localStorage.getItem("accessToken")) {
      Modal.error({
        getContainer: document.getElementById("upload-modal-container"),
        content: "로그인 후 이용 가능합니다",
      });
    } else if (!content.genre) {
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

        await axios.put(url, el, config).catch((err) => console.log(err));

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
      .catch((err) => console.log(err));
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
      <div className="responsiveLeftSpace2">
        <div className="responsiveIconList">
          <div className="spaceDirection">
            <div className="responsiveHomeButton">
              <div className="responsiveHomeButtonIcon">
                <Link to="/mainpage" className="noEffect">
                  <HomeOutlined
                    className="realIcon"
                    onClick={handleClickHomeBtn}
                  />
                </Link>
              </div>
            </div>

            <div className="responsiveHomeButton">
              <div className="responsiveHomeButtonIcon">
                <Link
                  className="noEffect"
                  onClick={() => handleClickUpload(true)}
                  to="/mainpage"
                >
                  <FileAddOutlined className="realIcon" />
                </Link>
              </div>
            </div>

            <div className="responsiveHomeButton">
              <div className="responsiveHomeButtonIcon">
                <Link className="noEffect" to="/mypage">
                  <UserOutlined className="realIcon" />
                </Link>
              </div>
            </div>

            <div className="responsiveHomeButton">
              <div className="responsiveHomeButtonIcon">
                <Link className="noEffect" to="/like">
                  <HeartOutlined className="realIcon" />
                </Link>
              </div>
            </div>

            <div className="responsiveHomeButton">
              <div className="responsiveHomeButtonIcon">
                <Link className="noEffect" to="/portfolio">
                  <SnippetsOutlined className="realIcon" />
                </Link>
              </div>
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

export default ResponsiveIconlistTablet;
