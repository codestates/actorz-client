import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editUserInfo,
  addUserCareer,
  removeUserCareer,
} from "../actions/userAction";
import img from "../images/actor.jpeg";
import "../styles/MypageEdit.css";
import Iconlist from "../components/Iconlist";
import Nav from "../components/Nav";
import { SaveOutlined, EditOutlined, DeleteOutlined, UserOutlined, IdcardOutlined, HeartOutlined, FileAddOutlined, HomeOutlined, GithubOutlined, ToolOutlined, InstagramOutlined, FormOutlined, FacebookOutlined, YoutubeOutlined, VerticalAlignBottomOutlined, ArrowDownOutlined} from '@ant-design/icons';
import Footer from '../components/Footer';

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
      setDob(event.target.value);
    } else if (key === "email") {
      setEmail(event.target.value);
    } else if (key === "company") {
      setCompany(event.target.value);
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
    console.log(email);

    handeClickEditBtn(false);
    dispatch(
      editUserInfo({
        id: user.data.userInfo.id,
        mainPic: user.data.userInfo.mainPic,
        email: email,
        name: user.data.userInfo.name,
        company: company,
        provider: user.data.userInfo.provider,
        gender: user.data.userInfo.gender,
        dob: dob,
        careers: user.data.userInfo.careers,
      })
    );
  };

  const handleClickConfirmBtn = () => {
    if (title.title !== undefined && year.year !== undefined) {
      dispatch(
        addUserCareer({
          id: null,
          title: title.title,
          year: Number(year.year),
          type: tag,
        })
      );
    }
  };

  return (
    <>
      <div className="blockhere"> </div>
          <div className="mainPage">
            <Nav />   
            <Iconlist />
            
            <div className="newblockPosition"> </div>

            <div className="middleSpace">
              <div className="midContents">
                <div className="buttonHeader">
                 <SaveOutlined className="editButton" onClick={() => handleClickSaveBtn()}/>
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
                        <li className="dob">
                          <input
                            type="text"
                            className="highlightDisplay"
                            defaultValue={user.data.userInfo.dob}
                            onChange={handleInputValue("dob")}
                          />
                        </li>
                        <strong>이메일</strong>
                        <li className="email">
                          <input
                            type="text"
                            className="highlightDisplay"
                            defaultValue={user.data.userInfo.email}
                            onChange={handleInputValue("email")}
                          ></input>
                        </li>
                        <strong>소속사</strong>
                        <li className="company">
                          <input
                            type="text"
                            className="highlightDisplay"
                            defaultValue={user.data.userInfo.company}
                            onChange={handleInputValue("company")}
                          ></input>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="careerTitle">
                    Career 🏆
                  </div>
                  <div className="careerContent">
                    <span className="career-box">
                      <li className="career-li">
                        <button className="career-btn" onClick={handleClickConfirmBtn}>
                          추가
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
      {/* <div id="mypage-container1">
        <div id="mypage-container">
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
        { <button className="career-add-btn" onClick={handleClickAddBtn}>
          + 추가
        </button> }
        <span className="career-box">
          <li className="career-li">
            <button className="career-btn" onClick={handleClickConfirmBtn}>
              추가
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
      </div> */}
    </>
  );
};
export default MypageEdit;
