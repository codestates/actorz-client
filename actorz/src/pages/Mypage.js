import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav";
import MypageEdit from "./MypageEdit";
import "../styles/Mypage.css";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import FileUpload from "../components/file-upload/file-upload.component";
import Iconlist from "../components/Iconlist";
import Footer from "../components/Footer";
import server from "../apis/server";
import { getUserInfo } from "../actions/userAction";

const Mypage = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();

  useEffect(() => getUser(), []);

   const handeDeleteAccount = async () => {
    await server
      .get(`/user/:user_id/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
          console.log(res);
          //if(res.data.data.id !== null){}
      })
      .catch((err) => {
        throw err;
      });
  };

  const getUser = async () => {
    await server
      .get(`/user/:user_id`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
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
  console.log(user); //여기에 서버에서 가져온 유저 정보가 담겨있음.

  return (
    <>
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
                  <DeleteOutlined className="deleteButton" onClick={() => handeDeleteAccount()}/>
                </div>
                <div className="midContentDownPart">
                  <div className="displayPosition">
                    <div className="fixedSize">
                      <img
                        src="https://media.vlpt.us/images/iooi75/post/167ee00c-d4ca-4ffe-b034-504673f8e1f1/image.png"
                        className="testPic"
                      />
                    </div>

                    <div className="fixedContent">
                      <p className="name">{user.data.userInfo.name}</p>
                      <ul>
                        <strong>생년월일</strong>
                        <li className="dob">{user.data.userInfo.dob}</li>
                        <strong>이메일</strong>
                        <li className="email">{user.data.userInfo.email}</li>
                        <strong>소속사</strong>
                        {user.data.userInfo.company ? (
                          <li className="company">
                            {user.data.userInfo.company}
                          </li>
                        ) : (
                          <li className="company"></li>
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* 영화랑 드라마 경력 나눌꺼면 여기서 */}
                  <div className="careerTitle">Career 🏆</div>
                  <div className="careerContent">
                    {user.data.userInfo.careers ? (
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
