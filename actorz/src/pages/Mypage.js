import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav";
import MypageEdit from "./MypageEdit";
import img from "../images/actor.jpeg";
import "../styles/Mypage.css";
import { EditOutlined, DeleteOutlined, UserOutlined, IdcardOutlined, HeartOutlined, FileAddOutlined, HomeOutlined, GithubOutlined, ToolOutlined, InstagramOutlined, FormOutlined, FacebookOutlined, YoutubeOutlined, VerticalAlignBottomOutlined, ArrowDownOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from "react-router-dom";
import FileUpload from "../components/file-upload/file-upload.component";
import Iconlist from "../components/Iconlist";
import Footer from '../components/Footer';


const Mypage = () => {
  const [newfile, setNewFile] = useState({
    profileImages: [],
  });
  const user = useSelector((user) => user.userInfoReducer);
  const [isEdit, setIsEdit] = useState(false);

  const handeClickEditBtn = (boolean) => {
    if (boolean) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };
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
      <Nav />
      {!isEdit ? (
        <>
          <div className="blockhere"> </div>
          <div className="mainPage">
            <Nav />   
            <Iconlist />
            
            <div className="newblockPosition"> </div>

            <div className="middleSpace">
              <div className="midContents">
                <div className="buttonHeader">
                 <EditOutlined className="editButton" onClick={() => handeClickEditBtn(true)}/>
                 &nbsp;&nbsp;
                 <DeleteOutlined className="deleteButton"/>
                </div>
                <div className="midContentDownPart">
                  <div className="displayPosition">
                    <div className="fixedSize">
                        <img src="https://media.vlpt.us/images/iooi75/post/167ee00c-d4ca-4ffe-b034-504673f8e1f1/image.png" className="testPic" />
                    </div>

                    <div className="fixedContent">
                        <p className="name">{user.data.userInfo.name}</p>
                        <ul>
                          <strong>생년월일</strong>
                          <li className="dob">{user.data.userInfo.dob}</li>
                          <strong>이메일</strong>
                          <li className="email">{user.data.userInfo.email}</li>
                          <strong>소속사</strong>
                          <li className="company">{user.data.userInfo.company}</li>
                        </ul>
                    </div>
                  </div>
                  {/* 영화랑 드라마 경력 나눌꺼면 여기서 */}
                  <div className="careerTitle">
                    Career 🏆
                  </div>
                  <div className="careerContent">
                    <div className="career">
                      {user.data.userInfo.careers.map((career) => {
                      return (
                        <li>
                        {`${career.year}` +
                        ` ${career.title}` +
                        ` / ` +
                        `${career.type.map((type) => {
                          return type;
                        })}`}
                        </li>
                       );
                      })}
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="newblockPosition2"> </div>

            <div className="rightSpace">  
              <div className="iconList2"> </div>
            </div>
          </div>
        

            {/* <div id="mypage-container">
              <img src={img} className="img" alt="프로필"></img>
              <span id="post-info">
                <button
                  className="post-edit"
                  onClick={() => handeClickEditBtn(true)}
                >
                  프로필 수정
                </button>
                <p className="name">{user.data.userInfo.name}</p>
                <ul>
                  <strong>생년월일</strong>
                  <li className="dob">{user.data.userInfo.dob}</li>
                  <strong>이메일</strong>
                  <li className="email">{user.data.userInfo.email}</li>
                  <strong>소속사</strong>
                  <li className="company">{user.data.userInfo.company}</li>
                </ul>
              </span>
            </div> */}
            {/*     
            <span className="career">
              {user.data.userInfo.careers.map((career) => {
                return (
                  <li>
                    {`${career.year}` +
                      ` ${career.title}` +
                      ` / ` +
                      `${career.type.map((type) => {
                        return type;
                      })}`}
                  </li>
                );
              })}
            </span> */}
        <Footer />
      </>
      ) : (
        <MypageEdit handeClickEditBtn={handeClickEditBtn} />
      )}
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
    </>
  );
};
export default Mypage;
