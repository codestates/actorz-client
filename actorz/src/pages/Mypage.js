import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../components/Nav";
import MypageEdit from "./MypageEdit";
import img from "../images/actor.jpeg";
import "../styles/Mypage.css";

const Mypage = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const [isEdit, setIsEdit] = useState(false);

  const handeClickEditBtn = (boolean) => {
    if (boolean) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  return (
    <>
      <Nav />
      {!isEdit ? (
        <div id="mypage-container1">
          <div id="mypage-container">
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
          </div>
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
          </span>
        </div>
      ) : (
        <MypageEdit handeClickEditBtn={handeClickEditBtn} />
      )}
    </>
  );
};
export default Mypage;
