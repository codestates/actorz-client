import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserCareer, removeUserCareer } from "../actions/userAction";
import img from "../images/actor.jpeg";
import "../styles/MypageEdit.css";

const MypageEdit = ({ handeClickEditBtn }) => {
  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();
  const [clickCareer, setClickCareer] = useState([]);
  const [tag, setTag] = useState([]);
  const [dob, setDob] = useState(user.data.userInfo.dob);
  const [email, setEmail] = useState(user.data.userInfo.email);
  const [company, setCompany] = useState(user.data.userInfo.company);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleInputValue = (key) => (event) => {
    if (key === "dob") {
      setDob({ [key]: event.target.value });
    } else if (key === "email") {
      setEmail({ [key]: event.target.value });
    } else if (key === "company") {
      setCompany({ [key]: event.target.value });
    } else if (key === "title") {
      setTitle({ [key]: event.target.value });
    } else if (key === "year") {
      setYear({ [key]: event.target.value });
    }
    //console.log(dob.dob, email.email, company);
    //console.log(title.title, year.year);
  };

  const handleClickAddBtn = () => {
    setClickCareer([...clickCareer, "career"]);
  };

  const handleTagBtn = (event) => {
    if (event.key === "Enter") {
      setTag([...tag, event.target.value]);
    }
  };

  const handleDeleteBtn = (id) => {
    dispatch(removeUserCareer(id));
  };

  const handleClickSaveBtn = () => {
    if (title.title !== undefined && year.year !== undefined) {
      dispatch(
        addUserCareer({
          id: 5, //나중에 바꾸기
          title: title.title,
          year: Number(year.year),
          type: tag,
        })
      );
    }
    handeClickEditBtn(false);
  };

  return (
    <>
      <div id="container1">
        <div id="post-container">
          <img src={img} className="img" alt="프로필"></img>
          <span id="post-info">
            <button className="post-edit" onClick={() => handleClickSaveBtn()}>
              저장
            </button>
            <p className="name">{user.data.userInfo.name}</p>
            <ul>
              <strong>생년월일</strong>
              <li className="dob">
                <input
                  type="text"
                  defaultValue={user.data.userInfo.dob}
                  onChange={handleInputValue("dob")}
                />
              </li>
              <strong>이메일</strong>
              <li className="email">
                <input
                  type="text"
                  defaultValue={user.data.userInfo.email}
                  onChange={handleInputValue("email")}
                ></input>
              </li>
              <strong>소속사</strong>
              <li className="company">
                <input
                  type="text"
                  defaultValue={user.data.userInfo.company}
                  onChange={handleInputValue("company")}
                ></input>
              </li>
            </ul>
          </span>
        </div>
        <span className="career">경력</span>
        <button className="career-add-btn" onClick={handleClickAddBtn}>
          + 추가
        </button>

        <span className="career-box">
          {user.data.userInfo.careers.map((career) => {
            return (
              <>
                <li className="career-li">
                  <button
                    className="career-delete-btn"
                    onClick={() => {
                      handleDeleteBtn(career.id);
                    }}
                  >
                    X
                  </button>
                  <span className="career-title">제목: </span>
                  <span>{career.title}</span>
                  <span className="career-year">활동연도: </span>
                  <span>{career.year}</span>
                  <div>
                    <span>태그: </span>
                    {`${career.type.map((type) => {
                      return type;
                    })}`}
                  </div>
                </li>
              </>
            );
          })}
        </span>
        {clickCareer.map((career) => {
          return (
            <span className="career-box">
              <li className="career-li">
                <button
                  className="career-delete-btn"
                  onClick={() => {
                    handleDeleteBtn(career.id);
                  }}
                >
                  X
                </button>
                <span className="career-title">제목: </span>
                <input type="text" onChange={handleInputValue("title")} />
                <span className="career-year">활동연도: </span>
                <input type="text" onChange={handleInputValue("year")} />
                <div>
                  <span>태그: </span>
                  <input
                    placeholder="태그를 입력하세요"
                    className="tag"
                    onKeyPress={handleTagBtn}
                  />
                </div>
                <div className="genre-tag-box">
                  {tag.map((el) => {
                    return <span className="genre-tag">{el}</span>;
                  })}
                </div>
              </li>
            </span>
          );
        })}
      </div>
    </>
  );
};
export default MypageEdit;
