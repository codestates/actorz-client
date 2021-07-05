import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import server from "../apis/server";
import {
  editUserInfo,
  addUserCareer,
  removeUserCareer,
} from "../actions/userAction";
import "../styles/MypageEdit.css";
import Iconlist from "../components/Iconlist";
import Nav from "../components/Nav";
import { CloseOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import "antd/dist/antd.css";
import { Button } from "antd";
import { Radio } from "antd";

const MypageEdit = ({ handeClickEditBtn }) => {
  const user = useSelector((user) => user.userInfoReducer);
  //console.log(user);
  const dispatch = useDispatch();
  //const [clickCareer, setClickCareer] = useState([]);
  const [tag, setTag] = useState([]);
  const [dob, setDob] = useState(user.data.userInfo.dob);
  const [email, setEmail] = useState(user.data.userInfo.email);
  const [company, setCompany] = useState(user.data.userInfo.company);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const tagOptions = [
    { label: "드라마", value: "드라마" },
    { label: "영화", value: "영화" },
    { label: "뮤지컬", value: "뮤지컬" },
    { label: "연극", value:  "연극" },
    { label: "광고", value: "광고" },
    { label: "뮤직비디오", value: "뮤직비디오" },
  ];

  const onChangeTag = (e) => {
    if(e.target.value==="드라마"){
      setTag([e.target.value]);
    } else if(e.target.value==="영화"){
      setTag([e.target.value]);
    } else if(e.target.value==="뮤지컬"){
      setTag([e.target.value]);
    } else if(e.target.value==="연극"){
      setTag([e.target.value]);
    } else if(e.target.value==="광고"){
      setTag([e.target.value]);
    } else if(e.target.value==="뮤직비디오"){
      setTag([e.target.value]);
    }
  };

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
  };

  /* const handleClickAddBtn = () => {
    setClickCareer([...clickCareer, "career"]);
  }; */

  // const handleTagBtn = (event) => {
  //   if (event.key === "Enter") {
  //     setTag([...tag, event.target.value]);
  //   }
  // };

  const handleDeleteBtn = (id) => {
    dispatch(removeUserCareer(id));
  };

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
          window.location = "/mainpage";
        }
      })
      .catch((err) => {
        throw err;
      });
  }


  const handleClickSaveBtn = async () => {
    handeClickEditBtn(false);
    let newUserInfo = {
      id: user.data.userInfo.id,
      mainPic: user.data.userInfo.mainPic,
      email: email,
      name: user.data.userInfo.name,
      company: company,
      provider: user.data.userInfo.provider,
      gender: user.data.userInfo.gender,
      dob: dob,
      careers: user.data.userInfo.careers,
    };
    dispatch(editUserInfo(newUserInfo));
    await server
      .post(`/user/:user_id/update`, {
        //서버에서는 req.headers["authorization"]으로 토큰을 받고있는데 이렇게 보내고 콘솔 찍어보면 req.body.headers에 들어간다...?
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        newUserInfo, //수정한 유저 정보가 들어있음.
        
      })
      .then((res) => {
        console.log('결과확인: '+ res);
      })
      .catch((err) => {
        throw err;
      });
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
              <SaveOutlined
                className="editButton"
                onClick={() => handleClickSaveBtn()}
              />
              <DeleteOutlined className="deleteButton" onClick={() => handleDeleteAccount()} />
            </div>
            <div className="midContentDownPart">
              <div className="displayPosition">
                <div className="fixedSize">
                  <img src={user.data.userInfo.mainPic} className="testPic" />
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
              <div className="careerTitleDivide">
                <div className="careerTitle">Career </div>
                <div className="iconTitle">🏆</div>
                <div className="careerButtonPosition">
                  <Button
                    variant="outlined"
                    className="careerButton"
                    onClick={handleClickConfirmBtn}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="careerContent">
                <div className="career-box">
                  <li className="career-li">
                    <div className="careerDivide">
                      <div className="career-title">제목:</div>
                      <input
                        type="text"
                        className="highlightDisplay"
                        onChange={handleInputValue("title")}
                      />
                      <div className="career-year">활동연도:</div>
                      <input
                        type="text"
                        className="highlightDisplay"
                        onChange={handleInputValue("year")}
                      />
                    </div>
                    <br></br>
                    <div className="careerDivide2">
                      <div className="career-tag2">태그:</div>
                      <div>
                      <Radio.Group 
                        className="radioButton"
                        options={tagOptions}
                        optionType="button"
                        buttonStyle="solid"
                        onChange={onChangeTag}
                      />
                      </div>
                    </div>
                  </li>
                </div>
              </div>
              <span className="career-box">
                {user.data.userInfo.careers.map((career) => {
                  return (
                    <>
                      <li className="career-li">
                        <div className="careerDivide">
                          <div className="career-title">제목:{career.title}</div>
                          {/* <div>{career.title}</div> */}
                          <div className="career-year">활동연도:{career.year}</div>
                          {/* <div>{career.year}</div> */}
                          <div className="blockhereplz"></div> 
                          <CloseOutlined
                            className="career-delete-btn"
                            onClick={() => {
                              handleDeleteBtn(career.id);
                            }}
                          />
                        </div>
                        <div className="careerDivide">
                          <div className="tag">
                            <div className="tagPosition">태그:</div>
                            <div>{career.type}</div>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })}
              </span>
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
  );
};
export default MypageEdit;
