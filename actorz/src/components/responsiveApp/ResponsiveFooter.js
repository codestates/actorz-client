import React, { useState } from "react";
import { getAllPostInfo } from "../../actions/postAction";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import FileUpload from "../../components/file-upload/file-upload.component";
import server from "../../apis/server";
import axios from "axios";
import { Modal } from "antd";
import {
  HomeOutlined,
  FileAddOutlined,
  UserOutlined,
  HeartOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "../../styles/ResponisveFooter.css";

const ResponsiveFooter = () => {
  const [clickupload, setClickUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    // login유무 확인
    if (!localStorage.getItem("accessToken")) {
      Modal.error({
        getContainer: document.getElementById("upload-modal-container"),
        content: "로그인 후 이용 가능합니다",
      });
      //alert("로그인 후 이용 가능합니다");
    } else if (!content.genre) {
      Modal.warning({
        getContainer: document.getElementById("upload-modal-container"),
        content: "장르를 선택해 주세요",
      });
      //return alert("장르를 선택해 주세요");
    } else {
      // loading 중...
      setIsLoading(true);
      // {type, path}들을 담을 변수, media 선언
      const media = [];

      for (let el of newfile.profileImages) {
        // 파일의 확장자 추출
        const ext = el.name.split(".")[1];
        // 파일을 저장할 url 생성
        const url = await server.get("/upload").then((res) => res.data.data);
        // 저장될 파일 경로 추출
        const path = url.split("?")[0];
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        // S3 bucket에 파일을 저장
        await axios.put(url, el, config).catch((err) => console.log(err));

        // DB에 저장할 파일 경로 가공
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
        // 파일 경로들을 array에 저장
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
        // 완료 후 등록완료 메세지 알림과 페이지 리디렉션
        setIsLoading(false);
        Modal.success({
          getContainer: document.getElementById("upload-modal-container"),
          content: "포스트가 등록되었습니다",
        });
        // alert("포스트가 등록되었습니다");
        redirectPage();
      })
      .catch((err) => console.log(err));
  };

  const redirectPage = () => {
    window.location = "/mainpage";
  };

  const handleClickHomeBtn = async () => {
    window.location = "/mainpage";
  };

  return (
    <>
      <div
        className="ResponsiveFooter"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ResponsivespaceDirection">
          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter"></div>
          </div>

          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              <Link to="/mainpage" className="noEffect">
                <HomeOutlined
                  className="realIcon"
                  onClick={handleClickHomeBtn}
                />
              </Link>
            </div>
          </div>

          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              <Link
                className="noEffect"
                to="/mainpage"
                onClick={() => handleClickUpload(true)}
              >
                <FileAddOutlined className="realIcon" />
              </Link>
            </div>
          </div>

          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              <Link className="noEffect" to="/mypage">
                <UserOutlined className="realIcon" />
              </Link>
            </div>
          </div>

          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              <Link className="noEffect" to="/like">
                <HeartOutlined className="realIcon" />
              </Link>
            </div>
          </div>

          <div className="responsiveHomeButtonFooter">
            <div className="responsiveHomeButtonIconFooter">
              <Link className="noEffect" to="/portfolio">
                <SnippetsOutlined className="realIcon" />
              </Link>
            </div>
          </div>
          <div className="likeButton"></div>
        </div>
      </div>
      <div>
        {clickupload ? (
          <div>
            <form onSubmit={handleSubmit}>
              <FileUpload
                isMobile={true}
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

export default ResponsiveFooter;
