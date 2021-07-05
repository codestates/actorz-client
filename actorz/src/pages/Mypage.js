import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import server from "../apis/server";
import Nav from "../components/Nav";
import { getUserInfo } from "../actions/userAction";
import MypageEdit from "./MypageEdit";
import FileUpload from "../components/file-upload/file-upload.component";
import Iconlist from "../components/Iconlist";
import Footer from "../components/Footer";
import "../styles/Mypage.css";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Mypage = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();
  const [userinfo, setUserinfo] = useState({});
  const [clickupload, setClickUpload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => getUser(), []);

  const handleDeleteAccount = async () => {
      await server
      .get(`/user/:user_id/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('회원탈퇴');
          localStorage.removeItem("accessToken"); 
          window.location = "/mainpage";
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  const getUser = async () => {
    await server
      .get(`/user/:user_id`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUserinfo(res.data.data.userInfo);
          dispatch(getUserInfo(res.data.data.userInfo));
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const [newfile, setNewFile] = useState({
    profileImages: [],
  });

  const handeClickEditBtn = (boolean) => {
    if (boolean) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

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

  const redirectPage = () => {
    alert("로그인 후 이용 가능합니다.");
    window.location = "/mainpage";
  };
  //console.log(user); //여기에 서버에서 가져온 유저 정보가 담겨있음.
  //console.log(userinfo);

  return (
    <>
      {localStorage.getItem("accessToken") ? (
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
                      <EditOutlined
                        className="editButton"
                        onClick={() => handeClickEditBtn(true)}
                      />
                      <DeleteOutlined className="deleteButton" onClick={() => handleDeleteAccount()}/>
                      {/* <DeleteOutlined className="deleteButton"/> */}
                    </div>
                    <div className="midContentDownPart">
                      <div className="displayPosition">
                        <div className="fixedSize">
                          <img src={userinfo.mainPic} className="testPic" />
                        </div>

                        <div className="fixedContent">
                          <p className="name">{userinfo.name}</p>
                          <ul>
                            <strong>생년월일</strong>
                            <li className="dob">{userinfo.dob}</li>
                            <strong>이메일</strong>
                            <li className="email">{userinfo.email}</li>
                            <strong>소속사</strong>
                            {userinfo.company ? (
                              <li className="company">{userinfo.company}</li>
                            ) : (
                              <li className="company"></li>
                            )}
                          </ul>
                        </div>
                      </div>
                      {/* 영화랑 드라마 경력 나눌꺼면 여기서 */}
                      <div className="careerTitle">Career </div>
                      {/* <div className="iconTitle">🏆</div> */}
                      <div className="careerContent">
                        {userinfo.careers ? (
                          <div className="career">
                            {userinfo.careers.map((career) => {
                              return (
                                <li>
                                  {`${career.year}` +
                                    ` ${career.title}` +
                                    ` / ` +
                                    `${career.type}`}
                                </li>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="career"></div>
                        )}
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
            </>
          ) : (
            <MypageEdit handeClickEditBtn={handeClickEditBtn} />
          )}
        </>
      ) : (
        redirectPage()
      )}

      {clickupload ? (
        <div>
          <form onSubmit={handleSubmit}>
            <FileUpload
              accept=".jpg,.png,.jpeg,.mp4"
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