import React, { useState } from "react";
import { UserOutlined, IdcardOutlined, HeartOutlined, FileAddOutlined, HomeOutlined, GithubOutlined, ToolOutlined, InstagramOutlined, FormOutlined, YoutubeOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import FileUpload from "../components/file-upload/file-upload.component";

const Iconlist = () => {
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

  return(
    <>
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
                <Link className="noEffect" onClick={() => handleClickUpload(true)} to="/">
                  <FileAddOutlined className="realIcon"/>
                </Link>
              </div>
                <Link className="noEffect">
                <div className="homeButtonText" onClick={() => handleClickUpload(true)} to="/">
                    Post
                </div>
              </Link>
            </div>

            <div className="homeButton">
              <div className="homeButtonIcon"> 
                <Link className="noEffect" to="/mypage">
                  <UserOutlined className="realIcon"/>
                </Link>
              </div>
                <Link className="noEffect" to="/mypage">
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
}

export default Iconlist;