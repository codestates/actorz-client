import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "antd/dist/antd.css";
import { Button } from "antd";
import FileUpload from "./file-upload/file-upload.component"; //파일 업로드 관련

const Nav = () => {
  const [search, setSearch] = useState("");
  const [clickSignin, setClickSignin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);

  const [newfile, setNewFile] = useState({
    //파일 업로드 관련
    profileImages: [],
  });
  const [clickupload, setClickUpload] = useState(false); //파일 업로드 관련

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };

  const handleClickSignin = () => {
    setClickSignup(false);
    if (clickSignin) {
      setClickSignin(false);
    } else {
      setClickSignin(true);
    }
  };

  const handleClickSignup = () => {
    setClickSignin(false);
    if (clickSignup) {
      setClickSignup(false);
    } else {
      setClickSignup(true);
    }
  };

  const handleClickUpload = () => {
    //파일 업로드 관련
    setClickUpload(true);
  };

  const updateUploadedFiles = (
    files //파일 업로드 관련
  ) => setNewFile({ ...newfile, profileImages: files });

  const handleSubmit = (event) => {
    //파일 업로드 관련
    event.preventDefault();
    // 여기에 이미지 올리는 로직 작성해야 함
  };

  return (
    <>
      <div id="nav">
        <span className="title">Actorz</span>

        <div className="search">
          <div>
            <a href="https://www.naver.com" target="_blank">
              <img
                src="https://media.vlpt.us/images/iooi75/post/4f4baec2-cb29-4b8b-b2ea-892cef41febc/Screen%20Shot%202021-06-22%20at%209.56.14%20PM.png"
                className="headerLogo"
              />
            </a>
          </div>

          <div className="blackNav">- </div>

          <div className="searchTotalNav">
            <input
              className="product-search"
              value={search}
              placeholder="  search..."
              onChange={(e) => inputHandler(e)}
            ></input>
            <Button variant="outlined" className="product-search-btn">
              검색
            </Button>
          </div>

          <div className="blackNav2">- </div>

          <div className="signBtnPosition">
            <img
              src="https://media.vlpt.us/images/iooi75/post/4f4baec2-cb29-4b8b-b2ea-892cef41febc/Screen%20Shot%202021-06-22%20at%209.56.14%20PM.png"
              className="headerLogo"
            />
            <input
              className="product-search"
              value={search}
              placeholder="search..."
              onChange={(e) => inputHandler(e)}
            ></input>
            <Button
              variant="outlined"
              className="product-search-btn"
              onClick={handleClickUpload}
            >
              검색
            </Button>{" "}
            {/* 파일 업로드 관련 */}
            <span className="signBtnPosition">
              <Button
                variant="outlined"
                className="navSignInBtn"
                onClick={handleClickSignin}
              >
                Sign in
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                className="navSignInBtn"
                onClick={handleClickSignup}
              >
                Sign up
              </Button>
            </span>
          </div>
        </div>

        {clickSignin ? (
          <Signin
            handleClickSignin={handleClickSignin}
            handleClickSignup={handleClickSignup}
          />
        ) : (
          <></>
        )}
        {clickSignup ? (
          <Signup
            handleClickSignin={handleClickSignin}
            handleClickSignup={handleClickSignup}
          />
        ) : (
          <></>
        )}
        {clickupload ? (
          <div>
            <form onSubmit={handleSubmit}>
              <FileUpload
                accept=".jpg,.png,.jpeg, .mp4"
                multiple
                updateFilesCb={updateUploadedFiles}
              />
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Nav;
